install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx npm run lint
build:
	rm -rf dist
	npm run build
