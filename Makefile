.PHONY: help install dev build start test lint format clean docker-build docker-up docker-down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install
	npm run db:generate

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run db:generate
	npm run build

start: ## Start production server
	npm run start

test: ## Run all tests
	npm run test:unit
	npm run test:e2e

lint: ## Run linting and formatting checks
	npm run lint
	npm run format:check
	npm run type-check

format: ## Format code
	npm run format

clean: ## Clean build artifacts
	rm -rf .next
	rm -rf node_modules
	rm -rf coverage
	rm -rf playwright-report
	rm -rf test-results

db-setup: ## Set up database
	npm run db:generate
	npm run db:push

docker-build: ## Build Docker image
	docker build -t microburbs-landing .

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f
