

start:
	./start
clean:
	rm -rf freeboard

install: clean start

.PHONY: start clean
