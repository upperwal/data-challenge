
run:
	docker run -it -d -v ${PWD}:/app -v /app/node_modules -p 3002:3000 upperwal/dsu:0.0.1

build: 
	docker build . -t upperwal/dsu:0.0.1