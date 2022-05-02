run:
	hugo serve

build:
	hugo -D --minify

theme:
	git subtree pull --prefix=themes/gohugoioTheme/ git@github.com:gohugoio/gohugoioTheme.git master --squash