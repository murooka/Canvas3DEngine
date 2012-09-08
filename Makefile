all: debug

debug:
	jsx --executable web --warn all --enable-type-check --enable-source-map --output jsx/engine.jsx.js jsx/engine.jsx

release:
	jsx --executable web --release --optimize lto,unclassify,fold-const,return-if,inline,dce,fold-const,dce,lcse,array-length,unclassify,unbox --output jsx/engine.jsx.rel.js jsx/engine.jsx
	java -jar /usr/local/closure-compiler/compiler.jar jsx/engine.jsx.rel.js > jsx/engine.jsx.js

clean:
	rm jsx/*.js
