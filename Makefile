install:
	npm install

start:
	nnpx babel-node src/bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish