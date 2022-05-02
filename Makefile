run:
	hugo serve

# Pull themes
theme:
	git subtree pull --prefix=themes/gohugoioTheme/ git@github.com:gohugoio/gohugoioTheme.git master --squash