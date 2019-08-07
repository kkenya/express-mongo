SHELL=/bin/bash
__PWD=$(shell pwd)

all: help

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//' | sort

clean:
	# volume削除

check-env: ## .env が存在するかチェック
	@if [ ! -f .env ]; then \
		echo $$'\e[31mERROR\e[m .env does not exist.'; \
		exit 1;\
	fi

dressup: check-env ## ローカルで起動
	docker-compose -f ./docker-compose.yml up --build
