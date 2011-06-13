JS_FILES = $(shell find ./lib | grep index.js && find lib | grep .js)
BENCHMARKS = `find benchmark -name *.benchmark.js `
TESTS = `find test -name *.test.js `
DOC_COMMAND=java -jar ./support/jsdoc/jsrun.jar ./support/jsdoc/app/run.js -t=./support/jsdoc/templates/jsdoc -d=./docs

test:
	for file in $(TESTS) ; do \
		node $$file ; \
	done

docs:
	$(DOC_COMMAND) $(JS_FILES)

docclean :
	rm -rf docs

benchmarks:
	for file in $(BENCHMARKS) ; do \
		node $$file ; \
	done


.PHONY: test docs docclean



