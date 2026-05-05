# Yum

A bookmarkable image wall for `yum.aolabs.io`.

Tiles are intentionally image-only. Hovering reveals a short caption; clicking opens the source page for the image.

The collection is intentionally built around Korean, Chinese, Mexican, American, Japanese, Italian, Vietnamese, and Cajun food, with no Indian or Mediterranean tiles.

Food, softer Haerin/Hanni/Wonyoung cameo tiles, and modern compact European sedan dream tiles are woven in a strict 1:1:1 ratio without intentional source repeats. The wall filters out heavy stage/editorial makeup, plain vegetable or single-piece food shots, and old/show-floor/traffic car photos.

When the Node server is deployed with OpenAI configured, `/api/curate` uses ChatGPT image understanding to rank new online image candidates before they enter the wall. If the endpoint is unavailable, the browser falls back to the local taste filters so the static GitHub Pages version still works.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

## ChatGPT Curation

Set these environment variables on Railway or any Node host:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-mini
```

Optional:

```bash
YUM_ALLOWED_ORIGINS=https://yum.aolabs.io,https://www.yum.aolabs.io,http://localhost:3000
YUM_AI_CANDIDATE_LIMIT=12
```

The OpenAI key must stay on the server. Do not put it in `public/` files.

## Deploy To GitHub Pages

The live site is served from the `gh-pages` branch with the custom domain `yum.aolabs.io`.

1. Commit changes on `main`.
2. Copy the updated `public` files into the `gh-pages` deployment worktree.
3. Commit and push `gh-pages`.

## Deploy To Railway

Railway can run this app as a Node service with `npm start`. Configure `OPENAI_API_KEY`, then point `yum.aolabs.io` at the Railway service if the AI curation endpoint should run on the same origin as the site.
