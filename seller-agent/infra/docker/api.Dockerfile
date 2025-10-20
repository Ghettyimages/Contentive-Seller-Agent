# syntax=docker/dockerfile:1
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /usr/src/app

FROM base AS builder
COPY package.json pnpm-workspace.yaml .npmrc* .yarnrc* ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm -w run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/apps/api/dist ./dist
COPY --from=builder /usr/src/app/apps/api/package.json ./package.json
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod
EXPOSE 4000
CMD ["node", "dist/main.js"]
