run:
	hugo serve

build:
	hugo -D --minify

theme:
	hugo mod get -u github.com/gohugoio/gohugoioTheme
	#git subtree pull --prefix=themes/gohugoioTheme/ git@github.com:gohugoio/gohugoioTheme.git master --squash
