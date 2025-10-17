# Seller Agent

A licensable, white-label platform to help sellers manage ad products, media buys, and reporting across ad servers.

## Quick Start

Prerequisites:
- Node 22
- pnpm 9
- Docker

Setup:
```bash
pnpm install
cp .env.example .env # set secrets
cp apps/api/.env.example apps/api/.env
cp apps/admin/.env.example apps/admin/.env
# Start Postgres and Redis
docker compose up -d postgres redis
# Run dev (admin on 3000, api on 4000)
pnpm -w run dev
```

Docker build/run:
```bash
docker compose up -d --build
```

Releasing with Changesets:
```bash
pnpm changeset
pnpm changeset version
pnpm -w install --no-frozen-lockfile
pnpm changeset publish
```

## Architecture

```
                       +----------------+
                       |    Admin UI    |
                       |  Next.js App   |
                       +--------+-------+
                                |
                                | NextAuth (Google OAuth)
                                v
+-------------------+   +-------+-------+      +--------------------+
|  Ad Server (GAM)  |<->|   API (Nest)  |<---->|  Postgres (Prisma) |
+-------------------+   +-------+-------+      +--------------------+
                                |
                                v
                          +-----+-----+
                          |   Redis   |
                          +-----------+
```

- API exposes REST endpoints to manage media buys, products, and delivery.
- Admin UI manages tenants, products, approvals, reporting, and settings.
- Shared packages provide types, adapters, auth, reporting, and licensing.

## Self-host vs SaaS

- Self-host: run with Docker Compose, manage your own Postgres/Redis, configure adapters and licensing.
- SaaS: deploy using provided containers and manage configuration via environment variables.

## Licensing

This repository is distributed under a commercial license. See `LICENSE-commercial.md`. No redistribution or reverse-engineering. Per-property limits apply.

## Example signed request

Minimal example creating a media buy:

```bash
API_KEY="your-api-key"
HMAC_SECRET="replace-me"
TIMESTAMP=$(date -u +%s000)
BODY='{"name":"Test Buy","budget":1000}'
SIG=$(printf "%s" "$TIMESTAMP$BODY" | openssl dgst -sha256 -hmac "$HMAC_SECRET" -binary | openssl base64 -A)

curl -X POST http://localhost:4000/media-buys \
  -H "content-type: application/json" \
  -H "x-api-key: $API_KEY" \
  -H "x-timestamp: $TIMESTAMP" \
  -H "x-signature: $SIG" \
  -d "$BODY"
```
