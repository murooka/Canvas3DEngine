

all: debug

debug:
	jsx --executable web --warn all --enable-type-check --enable-source-map --output jsx/engine.jsx.js jsx/engine.jsx

release:
	jsx --executable web --release --optimize lto,unclassify,fold-const,return-if,inline,dce,unbox,fold-const,dce,lcse,array-length,unclassify --output jsx/engine.jsx.js jsx/engine.jsx.js
	closure jsx/engine.jsx.js > jsx/engine.jsx.min.js

clean:
	rm jsx/*.js
