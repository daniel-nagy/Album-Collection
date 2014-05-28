# compresses Cascading Style Sheets and Javascript files

# declaring variables

UGLIFY		:= node_modules/.bin/uglifyjs
CLEAN			:= node_modules/.bin/cleancss
JS_FILES	:= $(filter-out %.min.js, $(wildcard source/javascripts/*.js))
CSS_FILES	:= $(filter-out %.min.css, $(wildcard source/stylesheets/*.css))
JS_MINI		:= $(addprefix javascripts/, $(notdir $(JS_FILES:.js=.min.js)))
CSS_MINI	:= $(addprefix stylesheets/, $(notdir $(CSS_FILES:.css=.min.css)))

# beginning minification

minify: minify-js minify-css silent

minify-js: $(JS_FILES) $(JS_MINI)

minify-css: $(CSS_MINI) $(CSS_FILES)

javascripts/%.min.js: source/javascripts/%.js
	@echo compressing $<
	@$(UGLIFY) -o $@ $<

stylesheets/%.min.css: source/stylesheets/%.css
	@echo compressing $<
	@$(CLEAN) -o $@ $<

silent:
	@:

clean:
	@echo removing files
	@rm -f $(JS_MINI) $(CSS_MINI)