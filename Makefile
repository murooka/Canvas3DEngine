all: demo1 demo2

demo1:
	jsx --executable web --release --output demo1/jsx/ball.jsx.js demo1/jsx/ball.jsx

demo2:
	jsx --executable web --release --output demo2/jsx/rotating_texture.jsx.js demo2/jsx/rotating_texture.jsx

clean:
	rm -f demo1/jsx/*.js
	rm -f demo2/jsx/*.js
	rm -f demo1/jsx/*.mapping
	rm -f demo2/jsx/*.mapping

.PHONY: demo1 demo2
