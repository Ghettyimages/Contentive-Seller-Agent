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
	pnpm -w run dev

build:
	pnpm -w run build

lint:
	pnpm -w run lint

format:
	pnpm -w run format

typecheck:
	pnpm -w run typecheck

test:
	pnpm -w run test

# Database helpers (stubs for now)

db-start:
	docker compose up -d postgres

db-migrate:
	@echo "TODO: implement prisma migrate"

db-seed:
	@echo "TODO: implement seed script"
