var mainBowerFiles  = require('main-bower-files'),
    filter          = require('gulp-filter'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    minifyCSS       = require('gulp-minify-css'),
    merge           = require('merge-stream'),
    fs              = require('fs'),
    mkdirp          = require('mkdirp');

module.exports = function() {

  var mainFiles = mainBowerFiles({includeDev: true});
  if(!mainFiles.length) return;

  var bowerData = loadJSONfile('./bower.json');
  var depFiles = filterFiles(mainFiles, bowerData.dependencies);
  var devFiles = filterFiles(mainFiles, bowerData.devDependencies);

  var depJSFilter = filter(["*.js"]);
  var depCSSFilter = filter(["*.css"]);
  var depFontsFilter = filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.otf"]);

  // Bower dependencies are common to project therefore are loaded and optimized together
  var depJS = gulp.src(depFiles)
    .pipe(depJSFilter)
    .pipe(concat('third-party-bower.js'))
    .pipe(uglify())
    .pipe(gulp.dest(ENV.dist_path + 'js'));

  var depCSS = gulp.src(depFiles)
    .pipe(depCSSFilter)
    .pipe(concat('third-party-bower.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(ENV.dist_path + 'styles'));

  // fonts
  var depFonts = gulp.src(mainFiles)
    .pipe(depFontsFilter)
    .pipe(gulp.dest(ENV.dist_path + 'fonts'));

  // Bower dev dependencies are organized separately to allow being loaded only when or if needed
  organizeDevDependenciesInFolders(devFiles);

  return merge(depJS, depCSS, depFonts);
};

function loadJSONfile (filename, encoding) {

  if (typeof (encoding) == 'undefined') encoding = 'utf8';
  var contents = fs.readFileSync(filename, encoding);
  return JSON.parse(contents);
}

function filterFiles(files, packages) {

  var fls = [];

  for(var package in packages) {
    for(var f in files) {
      if(files[f].indexOf('/'+package+'/') !== -1 && files[f].indexOf('fonts') === -1) {
        fls.push(files[f]);
      }
    }
  }

  return fls;
}

function organizeDevDependenciesInFolders(files) {

  var destPath = ENV.dist_path + 'dependencies/';

  for(var f in files) {

    var file = files[f].split('/bower_components/')[1];
    var folder = file.substring(0, file.indexOf('/'));

    mkdirp.sync(destPath + folder);

    gulp.src(files[f])
      .pipe(gulp.dest(destPath + folder));
  }
}
