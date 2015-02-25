module.exports = {
	webserver: {
		active: true,
		open: false,
		livereload: true
	},
	build_files: {
		js: ['js/main.js>app-main~', 'dependencies>dependencies~'],
		styles: ['styles>app-styles~']
	},
	inject_files: {
		main_file: 'index.html',
		js: [
			'js/third-party-bower.js',
  			'js/app-main.js'
		],
		styles: [
			'styles/third-party-bower.css',
  			'styles/**/*.css'
		]
	}
};