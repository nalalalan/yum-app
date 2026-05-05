const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const openAiApiKey = process.env.OPENAI_API_KEY || "";
const openAiModel = process.env.OPENAI_MODEL || "gpt-5-mini";
const maxCuratorCandidates = Number(process.env.YUM_AI_CANDIDATE_LIMIT || 12);
const allowedOrigins = String(process.env.YUM_ALLOWED_ORIGINS || "http://localhost:3000,https://yum.aolabs.io,https://www.yum.aolabs.io")
  .split(",")
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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

async function curateWithOpenAi({ category, source, candidates, limit }) {
  const clippedCandidates = candidates.slice(0, Math.max(1, maxCuratorCandidates));
  const selectedLimit = Math.min(Number(limit) || clippedCandidates.length, clippedCandidates.length);
  const content = [
    {
      type: "input_text",
      text: [
        `Category: ${category}`,
        `Source: ${cleanText(source && source.label, 120)}`,
        `Search query: ${cleanText(source && source.query, 180)}`,
        "Pick the best candidates by index. Use the image itself, not only the metadata.",
      ].join("\n"),
    },
  ];

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

  const cacheKey = JSON.stringify({
    model: openAiModel,
    category,
    limit,
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
    });
    const response = { ai: true, model: openAiModel, items };
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
