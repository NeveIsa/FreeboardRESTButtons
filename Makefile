

start:
	./start
clean:
	rm -rf freeboard

install: clean start

example: install


.PHONY: start clean
