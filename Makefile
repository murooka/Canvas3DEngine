all: debug

debug:
	jsx --executable web --warn all --enable-type-check --enable-source-map --output jsx/ball.jsx.js jsx/ball.jsx

release:
	jsx --executable web --release --optimize lto,unclassify,fold-const,return-if,inline,dce,fold-const,dce,lcse,array-length,unclassify,unbox --output jsx/ball.jsx.rel.js jsx/ball.jsx
	java -jar /usr/local/closure-compiler/compiler.jar jsx/ball.jsx.rel.js > jsx/ball.jsx.js

clean:
	rm jsx/*.js
	rm jsx/*.mapping
