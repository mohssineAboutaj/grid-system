/**
 * this file use to define the @paths for @gulpJs file
 * content:
 *** @port
 *** @root_directory
 *** @css_files_and_folders_path
 *** @javaScript_files_and_folders_path
 *** @docs_path
 *** and more
 */

// import @path module
const path = require('path');

// define an empty onject for @settings
let config = {}

/* Start filling the settings object */
config.port = 3000
config.rootDir = path.join(__dirname, "./")
config.root = config.rootDir
config.docsSrc = config.rootDir + "docs-src/"
config.docsCssSrc = config.docsSrc + "css/"
config.docsJsSrc = config.docsSrc + "js/"
config.docsSass = config.docsSrc + "scss/"
config.docs = config.rootDir + "docs/"
config.docsCss = config.docs + "css/"
config.docsJs = config.docs + "js/"
config.docsCssFiles = config.docsCss + "**/*.css"
config.docsJsFiles = config.docsJs + "**/*.js"
config.docsSassFiles = config.docsSass + "**/*.s[c|a]ss"
config.docsSassMain = config.docsSass + "style.scss"
config.sassFolder = config.rootDir + "scss/"
config.sassFiles = config.sassFolder + "**/*.scss"
config.sassMain = config.sassFolder + "grid-system.scss"
config.pugFolder = config.docsSrc + "pug/"
config.pugFiles = config.pugFolder + "**/*.pug"
config.pugMain = config.pugFolder + "index.pug"
config.cssFolder = config.rootDir + "css/"
config.jsList = [
	'./node_modules/js-cookie/src/js.cookie.js',
	'./node_modules/highlightjs/highlight.pack.min.js',
	config.docsJsSrc + 'script.js',
]
config.cssList = [
	'./node_modules/@fortawesome/fontawesome-free/css/all.min.css',
	'./node_modules/highlightjs/styles/monokai-sublime.css',
	'./css/grid-system.css',
	config.docsCssSrc + 'style.css',
]
/* End filling the settings object */

// export the settings
module.exports = config
