PREFIX ?= /usr/local
BENCHMARKS = `find benchmark -name *.benchmark.js `

benchmarks:
	for file in $(BENCHMARKS) ; do \
		node $$file ; \
	done
