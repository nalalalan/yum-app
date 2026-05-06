const http = require("node:http");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const fsp = fs.promises;
const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const dataDir = path.resolve(process.env.YUM_DATA_DIR || path.join(__dirname, ".yum-data"));
const preferencesPath = path.join(dataDir, "preferences.json");
const openAiApiKey = process.env.OPENAI_API_KEY || "";
const openAiModel = process.env.OPENAI_MODEL || "gpt-5-mini";
const maxCuratorCandidates = Number(process.env.YUM_AI_CANDIDATE_LIMIT || 12);
const editPin = process.env.YUM_EDIT_PIN || "";
const sessionSecret = process.env.YUM_SESSION_SECRET || process.env.OPENAI_API_KEY || "local-yum-session-secret";
const allowedOrigins = String(process.env.YUM_ALLOWED_ORIGINS || "http://localhost:3000,https://yum.aolabs.io,https://www.yum.aolabs.io")
  .split(/[,\s]+/)
  .map((origin) => origin.trim())
  .filter(Boolean);
const curationCache = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function cacheSet(key, value) {
  curationCache.set(key, value);
  if (curationCache.size > 200) {
    const firstKey = curationCache.keys().next().value;
    curationCache.delete(firstKey);
  }
}

function responseCorsOrigin(origin) {
  if (origin && allowedOrigins.includes(origin)) return origin;
  return allowedOrigins.find((candidate) => candidate === "https://yum.aolabs.io") || allowedOrigins[0] || "*";
}

function sendJson(req, res, status, payload) {
  const origin = req.headers.origin || "";
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": responseCorsOrigin(origin),
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers.Vary = "Origin";
  }

  res.writeHead(status, headers);
  res.end(JSON.stringify(payload));
}

function sendOptions(req, res) {
  const origin = req.headers.origin || "";
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Origin": responseCorsOrigin(origin),
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers.Vary = "Origin";
  }

  res.writeHead(204, headers);
  res.end();
}

function readJsonBody(req, maxBytes = 96 * 1024) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", reject);
  });
}

function cleanText(value, maxLength = 360) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function defaultPreferences() {
  return {
    version: 0,
    hiddenKeys: [],
    hiddenSamples: [],
    keptSamples: [],
    updatedAt: "",
  };
}

async function readPreferences() {
  try {
    const parsed = JSON.parse(await fsp.readFile(preferencesPath, "utf8"));
    return {
      ...defaultPreferences(),
      ...parsed,
      version: Number(parsed.version) || 0,
      hiddenKeys: Array.isArray(parsed.hiddenKeys) ? parsed.hiddenKeys : [],
      hiddenSamples: Array.isArray(parsed.hiddenSamples) ? parsed.hiddenSamples : [],
      keptSamples: Array.isArray(parsed.keptSamples) ? parsed.keptSamples : [],
    };
  } catch {
    return defaultPreferences();
  }
}

async function writePreferences(preferences) {
  await fsp.mkdir(dataDir, { recursive: true });
  const next = {
    ...defaultPreferences(),
    ...preferences,
    hiddenKeys: Array.isArray(preferences.hiddenKeys) ? preferences.hiddenKeys.slice(-900) : [],
    hiddenSamples: Array.isArray(preferences.hiddenSamples) ? preferences.hiddenSamples.slice(-180) : [],
    keptSamples: Array.isArray(preferences.keptSamples) ? preferences.keptSamples.slice(-180) : [],
    updatedAt: new Date().toISOString(),
  };
  await fsp.writeFile(preferencesPath, JSON.stringify(next, null, 2));
  return next;
}

function safeCandidate(candidate, index) {
  return {
    index,
    image: cleanText(candidate.image || candidate.original || "", 1000),
    original: cleanText(candidate.original || candidate.image || "", 1000),
    url: cleanText(candidate.url || "", 1000),
    sourceId: cleanText(candidate.sourceId || candidate.file || candidate.caption || "", 500),
    caption: cleanText(candidate.caption || "", 500),
    category: cleanText(candidate.category || "", 40),
    person: cleanText(candidate.person || "", 80),
    shape: cleanText(candidate.shape || "", 40),
    focus: cleanText(candidate.focus || "", 40),
  };
}

function safePreferenceSample(sample = {}) {
  return {
    key: cleanText(sample.key || sample.sourceId || sample.caption || "", 500),
    image: cleanText(sample.image || "", 1000),
    url: cleanText(sample.url || "", 1000),
    sourceId: cleanText(sample.sourceId || "", 500),
    caption: cleanText(sample.caption || "", 500),
    category: cleanText(sample.category || "", 40),
    person: cleanText(sample.person || "", 80),
    shape: cleanText(sample.shape || "", 40),
  };
}

function addPreferenceSample(list, sample) {
  if (!sample || !sample.key) return;
  const index = list.findIndex((item) => item.key === sample.key);
  if (index >= 0) list.splice(index, 1);
  list.push({ ...sample, updatedAt: new Date().toISOString() });
}

function safePreferences(preferences, category) {
  const hiddenSource = Array.isArray(preferences && preferences.hidden)
    ? preferences.hidden
    : preferences && preferences.hiddenSamples;
  const keptSource = Array.isArray(preferences && preferences.kept)
    ? preferences.kept
    : preferences && preferences.keptSamples;
  const hidden = Array.isArray(hiddenSource)
    ? hiddenSource.map(safePreferenceSample).filter((sample) => sample.key || sample.image || sample.caption)
    : [];
  const kept = Array.isArray(keptSource)
    ? keptSource.map(safePreferenceSample).filter((sample) => sample.key || sample.image || sample.caption)
    : [];

  return {
    version: Number(preferences && preferences.version) || 0,
    hidden: hidden.filter((sample) => !sample.category || sample.category === category).slice(-8),
    kept: kept.filter((sample) => !sample.category || sample.category === category).slice(-6),
  };
}

function mergePreferenceSamples(...lists) {
  const result = [];
  lists.flat().forEach((sample) => {
    if (!sample || !sample.key) return;
    const index = result.findIndex((item) => item.key === sample.key);
    if (index >= 0) result.splice(index, 1);
    result.push(sample);
  });
  return result;
}

function mergeCurationPreferences(stored, submitted) {
  return {
    version: Math.max(Number(stored.version) || 0, Number(submitted.version) || 0),
    hidden: mergePreferenceSamples(stored.hidden, submitted.hidden).slice(-8),
    kept: mergePreferenceSamples(stored.kept, submitted.kept).slice(-6),
  };
}

function base64url(input) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

function signTokenPayload(encodedPayload) {
  return crypto.createHmac("sha256", sessionSecret).update(encodedPayload).digest("base64url");
}

function createEditToken() {
  const payload = {
    scope: "yum-edit",
    iat: Date.now(),
    exp: Date.now() + 180 * 24 * 60 * 60 * 1000,
  };
  const encoded = base64url(payload);
  return `${encoded}.${signTokenPayload(encoded)}`;
}

function isValidEditToken(token) {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature) return false;

  const expected = signTokenPayload(encoded);
  const expectedBytes = Buffer.from(expected);
  const signatureBytes = Buffer.from(signature);
  if (expectedBytes.length !== signatureBytes.length || !crypto.timingSafeEqual(expectedBytes, signatureBytes)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload.scope === "yum-edit" && Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}

function requestBearerToken(req) {
  const authorization = req.headers.authorization || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function authorizePreferenceWrite(req, payload) {
  const token = payload.token || requestBearerToken(req);
  if (isValidEditToken(token)) {
    return { ok: true, token };
  }

  if (editPin && String(payload.pin || "") === editPin) {
    return { ok: true, token: createEditToken() };
  }

  return { ok: false };
}

function publicPreferences(preferences) {
  return {
    version: Number(preferences.version) || 0,
    hiddenKeys: Array.isArray(preferences.hiddenKeys) ? preferences.hiddenKeys : [],
    hiddenSamples: Array.isArray(preferences.hiddenSamples) ? preferences.hiddenSamples : [],
    keptSamples: Array.isArray(preferences.keptSamples) ? preferences.keptSamples : [],
    updatedAt: preferences.updatedAt || "",
  };
}

function sendPreferenceAuthError(req, res) {
  if (!editPin) {
    sendJson(req, res, 503, { error: "YUM_EDIT_PIN is not configured" });
    return;
  }

  sendJson(req, res, 401, { error: "PIN required", pinRequired: true });
}

async function handlePreferences(req, res) {
  if (req.method === "OPTIONS") {
    sendOptions(req, res);
    return;
  }

  if (req.method === "GET") {
    const preferences = await readPreferences();
    sendJson(req, res, 200, { preferences: publicPreferences(preferences), authRequired: Boolean(editPin) });
    return;
  }

  if (req.method !== "POST") {
    sendJson(req, res, 405, { error: "Use GET or POST" });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req, 256 * 1024);
  } catch (error) {
    sendJson(req, res, 400, { error: error.message });
    return;
  }

  const authorization = authorizePreferenceWrite(req, payload);
  if (!authorization.ok) {
    sendPreferenceAuthError(req, res);
    return;
  }

  const preferences = await readPreferences();
  if (payload.action === "auth") {
    sendJson(req, res, 200, { preferences: publicPreferences(preferences), editToken: authorization.token });
    return;
  }

  if (payload.action !== "hide") {
    sendJson(req, res, 400, { error: "Unsupported preference action" });
    return;
  }

  const hiddenSample = safePreferenceSample(payload.item || payload.hidden || {});
  if (!hiddenSample.key) {
    sendJson(req, res, 400, { error: "A hide action requires an item key" });
    return;
  }

  const hiddenKeys = new Set((preferences.hiddenKeys || []).map((key) => cleanText(key, 500)).filter(Boolean));
  hiddenKeys.add(hiddenSample.key);
  preferences.hiddenKeys = [...hiddenKeys].slice(-900);
  addPreferenceSample(preferences.hiddenSamples, hiddenSample);

  const hiddenCategory = hiddenSample.category;
  const visibleItems = Array.isArray(payload.visibleItems) ? payload.visibleItems : [];
  visibleItems
    .map(safePreferenceSample)
    .filter((sample) => {
      return sample.key
        && sample.key !== hiddenSample.key
        && !hiddenKeys.has(sample.key)
        && (!hiddenCategory || sample.category === hiddenCategory);
    })
    .slice(-18)
    .forEach((sample) => addPreferenceSample(preferences.keptSamples, sample));

  preferences.version = (Number(preferences.version) || 0) + 1;
  const saved = await writePreferences(preferences);
  sendJson(req, res, 200, { preferences: publicPreferences(saved), editToken: authorization.token });
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") return data.output_text;

  for (const item of data.output || []) {
    if (item.type !== "message") continue;
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
    }
  }

  return "";
}

function uniqueSelectedIndexes(selected, maxIndex, limit) {
  const seen = new Set();
  const result = [];

  (selected || []).forEach((entry) => {
    const index = Number(entry && entry.index);
    if (!Number.isInteger(index) || index < 0 || index > maxIndex || seen.has(index)) return;
    seen.add(index);
    result.push(index);
  });

  return result.slice(0, limit);
}

function curatorInstructions(category) {
  const shared = [
    "You curate an endless image wall for one person with strict taste rules.",
    "Reject repeated-looking, low-effort, ugly, boring, awkward, watermarked, diagram, menu, logo, or low quality images.",
    "Never select Ningning.",
    "Use the user's hide history as taste memory. Hidden examples are stronger than the general rules.",
    "Infer unlabeled patterns from hidden examples, including pose, styling, clothing, lighting, color, crop, car type, food composition, and overall vibe. Do not overgeneralize from one example, but repeated patterns should strongly affect ranking.",
    "Return only indexes for candidates that are genuinely good fits. If the batch is weak, select fewer items.",
  ];

  const categoryRules = {
    food: [
      "Food: prefer cooked, glossy, appetizing restaurant food with strong texture, sauce, char, broth, melted cheese, or a generous plated/table spread.",
      "Reject vegetable spreads, salads, plain ingredients, raw vegetables, isolated single sushi/nigiri pieces, white background product shots, and boring sterile food photos.",
    ],
    kpop: [
      "Girls: prefer Hanni, Haerin, or Wonyoung photos that feel natural, soft, clean, pretty, current, and low-makeup.",
      "Reject heavy makeup, stage/performance/concert photos, red carpet glam, editorial beauty-event looks, awkward press-line photos, and any Ningning images.",
    ],
    car: [
      "Cars: prefer modern compact European sedans or sedan-like gran coupes, especially BMW/Mercedes/Audi, in clean exterior road, studio, official press, or motion photos.",
      "Reject SUVs, crossovers, hatchbacks, old/classic/vintage cars, show-floor/exhibition photos, traffic surveillance/documentation photos, and ugly used-car/dealer shots.",
    ],
  };

  return [...shared, ...(categoryRules[category] || [])].join("\n");
}

function preferenceMemoryText(preferences) {
  const lines = [];
  if (preferences.hidden.length) {
    lines.push("Hidden examples. Treat these as negative taste signals:");
    preferences.hidden.forEach((sample, index) => {
      lines.push(`Hidden ${index + 1}: ${[sample.person, sample.caption, sample.sourceId, sample.shape].filter(Boolean).join(" | ")}`);
    });
  }

  if (preferences.kept.length) {
    lines.push("Nearby examples the user did not hide. Treat these as weaker positive signals:");
    preferences.kept.forEach((sample, index) => {
      lines.push(`Kept ${index + 1}: ${[sample.person, sample.caption, sample.sourceId, sample.shape].filter(Boolean).join(" | ")}`);
    });
  }

  return lines.join("\n");
}

async function curateWithOpenAi({ category, source, candidates, limit, preferences }) {
  const clippedCandidates = candidates.slice(0, Math.max(1, maxCuratorCandidates));
  const selectedLimit = Math.min(Number(limit) || clippedCandidates.length, clippedCandidates.length);
  const preferenceText = preferenceMemoryText(preferences);
  const content = [
    {
      type: "input_text",
      text: [
        `Category: ${category}`,
        `Source: ${cleanText(source && source.label, 120)}`,
        `Search query: ${cleanText(source && source.query, 180)}`,
        preferenceText,
        "Pick the best candidates by index. Use the image itself, not only the metadata.",
      ].filter(Boolean).join("\n"),
    },
  ];

  preferences.hidden.slice(-5).forEach((sample, index) => {
    content.push({
      type: "input_text",
      text: `Negative visual memory ${index + 1}: ${[sample.person, sample.caption, sample.sourceId].filter(Boolean).join(" | ")}`,
    });
    if (/^https?:\/\//i.test(sample.image)) {
      content.push({
        type: "input_image",
        image_url: sample.image,
        detail: "low",
      });
    }
  });

  preferences.kept.slice(-3).forEach((sample, index) => {
    content.push({
      type: "input_text",
      text: `Weak positive visual memory ${index + 1}: ${[sample.person, sample.caption, sample.sourceId].filter(Boolean).join(" | ")}`,
    });
    if (/^https?:\/\//i.test(sample.image)) {
      content.push({
        type: "input_image",
        image_url: sample.image,
        detail: "low",
      });
    }
  });

  clippedCandidates.forEach((candidate) => {
    content.push({
      type: "input_text",
      text: [
        `Candidate ${candidate.index}`,
        `person: ${candidate.person || ""}`,
        `caption: ${candidate.caption || ""}`,
        `source id: ${candidate.sourceId || ""}`,
        `shape: ${candidate.shape || ""}`,
      ].join("\n"),
    });

    if (/^https?:\/\//i.test(candidate.image)) {
      content.push({
        type: "input_image",
        image_url: candidate.image,
        detail: "low",
      });
    }
  });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openAiModel,
      instructions: curatorInstructions(category),
      input: [{ role: "user", content }],
      text: {
        format: {
          type: "json_schema",
          name: "yum_curation",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["selected"],
            properties: {
              selected: {
                type: "array",
                maxItems: selectedLimit,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["index", "score"],
                  properties: {
                    index: { type: "integer" },
                    score: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error && data.error.message ? data.error.message : `OpenAI request failed: ${response.status}`;
    throw new Error(message);
  }

  const text = extractResponseText(data);
  const parsed = JSON.parse(text);
  const selectedIndexes = uniqueSelectedIndexes(parsed.selected, clippedCandidates.length - 1, selectedLimit);
  return selectedIndexes.map((index) => clippedCandidates[index]);
}

async function handleCurate(req, res) {
  if (req.method === "OPTIONS") {
    sendOptions(req, res);
    return;
  }

  if (req.method !== "POST") {
    sendJson(req, res, 405, { error: "Use POST" });
    return;
  }

  if (!openAiApiKey) {
    sendJson(req, res, 503, { error: "OPENAI_API_KEY is not configured" });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    sendJson(req, res, 400, { error: error.message });
    return;
  }

  const category = cleanText(payload.category || "", 30);
  const candidates = Array.isArray(payload.candidates)
    ? payload.candidates.map((candidate, index) => safeCandidate(candidate, index)).filter((candidate) => candidate.image)
    : [];
  const limit = Math.min(Math.max(Number(payload.limit) || candidates.length, 1), candidates.length || 1);

  if (!["food", "kpop", "car"].includes(category) || !candidates.length) {
    sendJson(req, res, 400, { error: "A valid category and candidates array are required" });
    return;
  }

  const preferences = mergeCurationPreferences(
    safePreferences(await readPreferences(), category),
    safePreferences(payload.preferences || {}, category),
  );
  const preferenceSignature = {
    version: preferences.version,
    hidden: preferences.hidden.map((sample) => sample.key || sample.sourceId || sample.image).slice(-8),
    kept: preferences.kept.map((sample) => sample.key || sample.sourceId || sample.image).slice(-6),
  };

  const cacheKey = JSON.stringify({
    model: openAiModel,
    category,
    limit,
    preferences: preferenceSignature,
    candidates: candidates.slice(0, maxCuratorCandidates).map((candidate) => candidate.sourceId || candidate.image),
  });

  if (curationCache.has(cacheKey)) {
    sendJson(req, res, 200, curationCache.get(cacheKey));
    return;
  }

  try {
    const items = await curateWithOpenAi({
      category,
      source: payload.source || {},
      candidates,
      limit,
      preferences,
    });
    const response = { ai: true, model: openAiModel, preferenceVersion: preferences.version, items };
    cacheSet(cacheKey, response);
    sendJson(req, res, 200, response);
  } catch (error) {
    sendJson(req, res, 502, { error: error.message });
  }
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === "/api/curate") {
    handleCurate(req, res);
    return;
  }

  if (pathname === "/api/preferences") {
    handlePreferences(req, res).catch((error) => {
      sendJson(req, res, 500, { error: error.message });
    });
    return;
  }

  if (pathname === "/") pathname = "/index.html";

  const normalizedPath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, normalizedPath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(res, filePath);
});

server.listen(port, () => {
  console.log(`Yum wall running at http://localhost:${port}`);
});
