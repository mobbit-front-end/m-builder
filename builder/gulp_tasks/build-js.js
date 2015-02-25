var uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat'),
    gulpif    = require('gulp-if');

var content_path,
    dist_path, dist_file,
    concat_file, uglify_file;  

module.exports = function() {

  var files = ENV.build_files.js;

  if(files.length > 0) {
    files.map(function(fl){
      fl.indexOf('.js') !== -1 ? moveFile(fl) : moveFolder(fl);
    });
  }
};

function moveFile(content) {

  validate(content);

  gulp.src( ENV.dev_path + content_path )
      .pipe(gulpif(concat_file, concat(dist_file + '.js')))
      .pipe(gulpif(uglify_file, uglify()))
      .pipe(gulp.dest( ENV.dist_path + dist_path ));
}

function moveFolder(content) {

  validate(content);

  gulp.src( ENV.dev_path + content_path + '/**/*.js' )
      .pipe(gulpif(concat_file, concat(dist_file + '.js')))
      .pipe(gulpif(uglify_file, uglify()))
      .pipe(gulp.dest( ENV.dist_path + dist_path ));
}

function validate(content) {

  concat_file = content.indexOf('>') !== -1 ? true : false;
  uglify_file = content.indexOf('~') !== -1 ? true : false;

  if(concat_file) {
    dist_file = uglify_file ? content.split('>')[1].slice(0, -1) : content.split('>')[1];
    dist_path = content.indexOf('/') !== -1 ? content.split('>')[0].substring(0, content.split('>')[0].lastIndexOf('/')) : content.split('>')[0];
    content_path = content.split('>')[0];
  } else {
    dist_file = dist_path = content_path = uglify_file ? content.slice(0, -1) : content;
    if(dist_path.indexOf('/') !== -1) dist_path = dist_path.substring(0, dist_path.lastIndexOf('/'));
  }
}

