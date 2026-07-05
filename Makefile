# LABEL Maintainer="dean"  Description="https://github.com/airdb"
SERVICE := https://airdb.net

all: help

help: ## Show help messages
	@echo "Homepage - ${SERVICE} "
	@echo
	@echo "Usage:\tmake COMMAND"
	@echo
	@echo "Commands:"
	@sed -n '/##/s/\(.*\):.*##/  \1#/p' ${MAKEFILE_LIST} | grep -v "MAKEFILE_LIST" | column -t -c 2 -s '#'

run: ## Run locally
	pnpm dev

install: ## Install dependencies
	pnpm install --frozen-lockfile

build: ## Build website
	pnpm build
