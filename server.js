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
const kpopAlbumCache = new Map();

const kpopAlbums = [
  { person: "Wonyoung", label: "Wonyoung crop-top midriff Instagram", url: "https://kpopping.com/kpics/240304-WONYOUNG-INSTAGRAM-UPDATE" },
  { person: "Wonyoung", label: "Wonyoung crop-top Instagram", url: "https://kpopping.com/kpics/260626-wonyoung-instagram-update" },
];

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
  ".pdf": "application/pdf",
  ".tex": "text/x-tex; charset=utf-8",
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

function mergeClientPreferences(preferences, submitted) {
  if (!submitted || typeof submitted !== "object") return false;
  let changed = false;
  const hiddenKeys = new Set((preferences.hiddenKeys || []).map((key) => cleanText(key, 500)).filter(Boolean));

  if (Array.isArray(submitted.hiddenKeys)) {
    submitted.hiddenKeys.map((key) => cleanText(key, 500)).filter(Boolean).forEach((key) => {
      if (!hiddenKeys.has(key)) changed = true;
      hiddenKeys.add(key);
    });
  }

  if (Array.isArray(submitted.hiddenSamples)) {
    submitted.hiddenSamples.map(safePreferenceSample).filter((sample) => sample.key).forEach((sample) => {
      if (!hiddenKeys.has(sample.key)) changed = true;
      hiddenKeys.add(sample.key);
      addPreferenceSample(preferences.hiddenSamples, sample);
    });
  }

  if (Array.isArray(submitted.keptSamples)) {
    submitted.keptSamples.map(safePreferenceSample).filter((sample) => sample.key).forEach((sample) => {
      addPreferenceSample(preferences.keptSamples, sample);
    });
  }

  preferences.hiddenKeys = [...hiddenKeys].slice(-900);
  preferences.version = Math.max(Number(preferences.version) || 0, Number(submitted.version) || 0);
  return changed;
}

function cleanExtractedImageUrl(value) {
  let url = String(value || "")
    .replace(/\\u002F/g, "/")
    .replace(/&amp;/g, "&")
    .replace(/\\+/g, "")
    .replace(/["'<>]+$/g, "")
    .trim();

  try {
    url = decodeURIComponent(url);
  } catch {
    // Keep the original URL if a page contains a partially encoded fragment.
  }

  if (!/^https?:\/\//i.test(url) && /^(legacy\.kpopping\.com|pub-dc9a9c6ac2a64ba48bce426ced0ac56a\.r2\.dev)\//i.test(url)) {
    url = `https://${url}`;
  }

  url = url
    .replace(/[?&](w|q|size)=.*$/i, "")
    .replace(/["'<>]+$/g, "")
    .trim();

  if (!/^https?:\/\/(legacy\.kpopping\.com|pub-dc9a9c6ac2a64ba48bce426ced0ac56a\.r2\.dev)\//i.test(url)) return "";
  if (!/\.(jpe?g|png|webp)(?:$|\?)/i.test(url)) return "";
  if (/graph|logo|icon|avatar|profile|favicon|apple/i.test(url)) return "";
  return url;
}

function extractKpopImages(html) {
  const candidates = new Set();
  const text = String(html || "").replace(/&amp;/g, "&");
  const directPattern = /https?:\/\/(?:legacy\.kpopping\.com|pub-dc9a9c6ac2a64ba48bce426ced0ac56a\.r2\.dev)\/[^"'<>\s]+/gi;
  const encodedPattern = /https%3A%2F%2F(?:legacy\.kpopping\.com|pub-dc9a9c6ac2a64ba48bce426ced0ac56a\.r2\.dev)%2F[^"'<>\s&]+/gi;
  const protocolLessPattern = /(?:legacy\.kpopping\.com|pub-dc9a9c6ac2a64ba48bce426ced0ac56a\.r2\.dev)%2F[^"'<>\s&]+/gi;

  [directPattern, encodedPattern, protocolLessPattern].forEach((pattern) => {
    for (const match of text.matchAll(pattern)) {
      const cleaned = cleanExtractedImageUrl(match[0]);
      if (cleaned) candidates.add(cleaned);
    }
  });

  return [...candidates];
}

async function fetchKpopAlbum(album) {
  const cached = kpopAlbumCache.get(album.url);
  if (cached && Date.now() - cached.fetchedAt < 60 * 60 * 1000) return cached.images;

  const response = await fetch(album.url, {
    headers: {
      "User-Agent": "Mozilla/5.0 Yum image wall",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!response.ok) throw new Error(`K-pop album fetch failed: ${response.status}`);

  const html = await response.text();
  const images = extractKpopImages(html);
  kpopAlbumCache.set(album.url, { fetchedAt: Date.now(), images });
  return images;
}

async function handleKpopCandidates(req, res, requestUrl) {
  if (req.method === "OPTIONS") {
    sendOptions(req, res);
    return;
  }

  if (req.method !== "GET") {
    sendJson(req, res, 405, { error: "Use GET" });
    return;
  }

  const person = cleanText(requestUrl.searchParams.get("person") || "", 40);
  const offset = Math.max(0, Number(requestUrl.searchParams.get("offset") || 0) || 0);
  const limit = Math.min(Math.max(Number(requestUrl.searchParams.get("limit") || 36) || 36, 1), 60);
  const albums = kpopAlbums.filter((album) => !person || album.person.toLowerCase() === person.toLowerCase());
  const items = [];

  await Promise.all(albums.map(async (album) => {
    try {
      const images = await fetchKpopAlbum(album);
      images.forEach((image, index) => {
        items.push({
          image,
          original: image,
          url: album.url,
          sourceId: image,
          caption: `${album.person} cameo, natural clean online portrait ${index + 1}.`,
          category: "kpop",
          person: album.person,
          shape: index % 7 === 0 ? "tall" : "portrait",
          focus: "center 38%",
          albumLabel: album.label,
        });
      });
    } catch {
      // A single source should not empty the whole feed.
    }
  }));

  const uniqueItems = [];
  const seen = new Set();
  items.forEach((item) => {
    if (seen.has(item.sourceId)) return;
    seen.add(item.sourceId);
    uniqueItems.push(item);
  });

  const sliced = uniqueItems.slice(offset, offset + limit);
  sendJson(req, res, 200, {
    items: sliced,
    nextOffset: offset + sliced.length < uniqueItems.length ? offset + sliced.length : null,
    total: uniqueItems.length,
  });
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
  const mergedClientPreferences = mergeClientPreferences(preferences, payload.clientPreferences);
  if (payload.action === "auth") {
    const responsePreferences = mergedClientPreferences ? await writePreferences(preferences) : preferences;
    sendJson(req, res, 200, { preferences: publicPreferences(responsePreferences), editToken: authorization.token });
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

function uniqueSelectedEntries(selected, maxIndex, limit, category) {
  const seen = new Set();
  const result = [];

  (selected || []).forEach((entry) => {
    const index = Number(entry && entry.index);
    if (!Number.isInteger(index) || index < 0 || index > maxIndex || seen.has(index)) return;
    const exposure = cleanText(entry && entry.exposure ? entry.exposure : "", 40).toLowerCase();
    if (category === "kpop" && !["navel", "both", "pose"].includes(exposure)) return;
    seen.add(index);
    result.push({ index, exposure });
  });

  return result.slice(0, limit);
}

function kpopExposureCaption(item, exposure) {
  const person = cleanText(item && item.person ? item.person : "K-pop", 80);
  if (exposure === "both") return `${person} cameo, midriff and navel visible.`;
  if (exposure === "navel") return `${person} cameo, navel-visible crop-top frame.`;
  return `${person} cameo, body-visible confident pose.`;
}

function curatorInstructions(category) {
  const shared = [
    "You curate an endless image wall for one person with strict taste rules.",
    "Reject repeated-looking, low-effort, ugly, boring, awkward, watermarked, diagram, menu, logo, or low quality images.",
    "Never select Ningning.",
    "Use the user's hide history as taste memory. Hidden examples are stronger than the general rules.",
    "Infer unlabeled patterns from hidden examples, including pose, styling, clothing, lighting, color, crop, car type, food composition, and overall vibe. Do not overgeneralize from one example, but repeated patterns should strongly affect ranking.",
    "Return only indexes for candidates that are genuinely good fits. If the batch is weak, select fewer items.",
    "For food and car selections, return exposure as exactly not_applicable.",
  ];

  const categoryRules = {
    food: [
      "Food: prefer cooked, glossy, appetizing restaurant food with strong texture, sauce, char, broth, melted cheese, or generous tight plating.",
      "Reject vegetable spreads, salads, plain ingredients, raw vegetables, tomato soup, pumpkin soup, vegetable soup, plain soup, ingredient-garnish bowls, empty-plate shots, restaurant-exterior or restaurant-sign photos, isolated single sushi/nigiri pieces, burger-and-fries or steak-fries table snapshots, paella/lemon-pan food shots, generic pasta-plate or restaurant-place-setting crops, white background product shots, boring sterile food photos, dim flash snapshots, bad-framed table documentation, lunch boxes, packaged meals, any visible people, family meals, children, babies, dining-room scenes, people-at-table shots, home cooking snapshots, office food, and family/table-documentation photos.",
    ],
    kpop: [
      "Girls: prefer adult-era Wonyoung crop-top or midriff photos that feel natural, confident, pretty, current, low-makeup, and non-explicit.",
      "Mandatory gate: select a K-pop image only when the image itself clearly shows exposed midriff, bare waist, crop top, belly button, navel, or a body-visible adult-era pose. Bare shoulders alone are not enough. Reject face-only crops, headshots, forehead-heavy closeups, and any photo where clothing fully covers the waist/midriff.",
      "Hard reject any K-pop candidate with a coat, jacket, blazer, cardigan, hoodie, sweater, long sleeves, turtleneck, parka, puffer, trench coat, scarf, fully covered shoulders, or other outerwear-heavy styling.",
      "For every selected K-pop candidate, return exposure as exactly navel, both, or pose. If the visible image does not clearly justify one of those labels, do not select it.",
      "Reject heavy makeup, stage/performance/concert photos, red carpet glam, editorial beauty-event looks, awkward press-line photos, underage-era archives, and any Ningning images.",
    ],
    car: [
      "Cars: prefer 2025/2026 MINI Cooper 2 Door/Hardtop official exterior photos, plus modern compact Mercedes and Audi sedans in clean exterior road, studio, official press, or motion photos.",
      "Reject all BMW-branded cars. MINI is allowed only when it is a Cooper 2 Door/Hardtop, not Countryman/Aceman/Clubman/crossover. Reject SUVs, crossovers, generic hatchbacks, old/classic/vintage cars, show-floor/exhibition photos, traffic surveillance/documentation photos, and ugly used-car/dealer shots.",
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
        detail: category === "kpop" ? "high" : "low",
      });
    }
  });

  const selectedItemSchema = category === "kpop"
    ? {
        type: "object",
        additionalProperties: false,
        required: ["index", "score", "exposure"],
        properties: {
          index: { type: "integer" },
          score: { type: "number" },
          exposure: { type: "string", enum: ["navel", "both", "pose"] },
        },
      }
    : {
        type: "object",
        additionalProperties: false,
        required: ["index", "score", "exposure"],
        properties: {
          index: { type: "integer" },
          score: { type: "number" },
          exposure: { type: "string", enum: ["not_applicable"] },
        },
      };

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
                items: selectedItemSchema,
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
  const selectedEntries = uniqueSelectedEntries(parsed.selected, clippedCandidates.length - 1, selectedLimit, category);
  return selectedEntries.map(({ index, exposure }) => {
    const item = clippedCandidates[index];
    if (category !== "kpop") return item;
    return {
      ...item,
      aiExposureApproved: true,
      exposure,
      caption: kpopExposureCaption(item, exposure),
    };
  });
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

  if (pathname === "/api/kpop-candidates") {
    handleKpopCandidates(req, res, requestUrl).catch((error) => {
      sendJson(req, res, 502, { error: error.message });
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
