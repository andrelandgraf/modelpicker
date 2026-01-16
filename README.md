# Model Picker

Curated AI model recommendations with primary and fallback options. Query the API, pin a snapshot, and ship with confidence.

## API

### Get model recommendations

```
GET /api/v1/{date}/{category}
```

- `date`: Snapshot date (e.g., `2026-01-15`) or `latest`
- `category`: `coding`, `summarization`, or `research`

```bash
curl https://modelpicker.ai/api/v1/latest/coding
```

### List categories

```
GET /api/v1/categories
```

### List snapshots

```
GET /api/v1/snapshots
```

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).
