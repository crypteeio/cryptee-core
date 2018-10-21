build:
	yarn
	yarn build

build-test:
	make build

build-npm:
	yarn run build:npm
	cd ./npm && npm publish