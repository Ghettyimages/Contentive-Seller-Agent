SHELL := /bin/bash

NODE_VERSION ?= 22
PNPM_VERSION ?= 9

.PHONY: setup dev build test lint typecheck db-start db-migrate db-seed up down logs

setup:
	@echo "Installing pnpm@$(PNPM_VERSION) if missing..."
	npm -g ls pnpm >/dev/null 2>&1 || npm -g install pnpm@$(PNPM_VERSION)
	pnpm install

up:
	docker compose up -d postgres redis

down:
	docker compose down

logs:
	docker compose logs -f

dev:
	$(MAKE) up
	pnpm -r --filter ./apps/* run dev

build:
	pnpm -r run build

lint:
	pnpm -r run lint

format:
	prettier --write .

typecheck:
	pnpm -r run typecheck

test:
	vitest run

# Database helpers

db-start:
	docker compose up -d postgres

db-migrate:
	pnpm --filter @contentive/seller-agent-api run prisma:migrate

db-seed:
	pnpm --filter @contentive/seller-agent-api run prisma:seed
