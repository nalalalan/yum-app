# Yum

A bookmarkable image wall for `yum.aolabs.io`.

Tiles are intentionally image-only. Hovering reveals a short caption; clicking opens the source page for the image.

The collection is intentionally built around Korean, Chinese, Mexican, American, Japanese, Italian, Vietnamese, and Cajun food, with no Indian or Mediterranean tiles.

Cars, food, alcohol, and adult-era Wonyoung crop-top/midriff K-pop tiles are woven into a strict taste-balanced feed without intentional source repeats. The wall filters out forehead-heavy idol closeups, face-only/headshot crops, shoulder-only legacy idol batches, heavy stage/editorial makeup, low-resolution K-pop images, plain vegetable or single-piece food shots, tomato/pumpkin/vegetable/plain soup shots, plain garnish/ingredient bowls, empty plates, restaurant exterior/sign photos, dim/bad-framed food documentation, BMW-branded cars, MINI Countryman/crossover substitutions, and old/show-floor/traffic car photos. Food now cycles from the reviewed static pool instead of live online food refills. The car lane includes 2025/2026 MINI Cooper 2 Door/Hardtop imagery alongside the Audi/Mercedes mix.

When the Node server is deployed with OpenAI configured, `/api/curate` uses ChatGPT image understanding to rank new online image candidates before they enter the wall. The backend also supplies deeper K-pop archive candidates so the strict 1:1:1 feed does not stop after the small static set. If the endpoint is unavailable, the browser falls back to the local taste filters so the static GitHub Pages version still works.

Each tile has a quiet hide control. Hidden source keys and compact taste samples are stored by the Node backend through `/api/preferences`, then mirrored in the browser. The first edit requires a PIN; after that the browser keeps an edit token. Because the preference file lives on the hosted backend, hidden tiles and taste memory carry across computers and sessions.

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
YUM_DATA_DIR=/data
YUM_EDIT_PIN=...
YUM_SESSION_SECRET=...
```

The OpenAI key, edit PIN, and session secret must stay on the server. Do not put them in `public/` files.

## Deploy To GitHub Pages

The live site is served from the `gh-pages` branch with the custom domain `yum.aolabs.io`.

1. Commit changes on `main`.
2. Copy the updated `public` files into the `gh-pages` deployment worktree.
3. Commit and push `gh-pages`.

## Deploy To Railway

Railway can run this app as a Node service with `npm start`. Configure `OPENAI_API_KEY`, `YUM_EDIT_PIN`, `YUM_SESSION_SECRET`, and a persistent volume mounted at `YUM_DATA_DIR` so `/api/preferences` survives deploys and restarts. The static GitHub Pages site can still call the Railway API from `yum.aolabs.io`.
