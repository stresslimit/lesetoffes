
dev: build-js build-css

build-js:
	duo js/index.js > js/build.js && uglifyjs js/build.js > assets/build.js

build-css:
	duo css/index.css > css/build.css \
	&& myth css/build.css css/build.css \
	&& uglifycss css/build.css > assets/build.css
