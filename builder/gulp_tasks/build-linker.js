var linker = require('gulp-linker');

module.exports = function() {

  console.log(ENV.inject_files.js);

  gulp.src( ENV.dist_path + ENV.inject_files.main_file )
    .pipe(linker({
      scripts: buildPath(ENV.inject_files.js),
      startTag: '<!--SCRIPTS-->',
      endTag: '<!--SCRIPTS END-->',
      fileTmpl: '<script src="/%s"></script>',
      appRoot: ENV.dist_path
    }))
    .pipe(linker({
      scripts: buildPath(ENV.inject_files.styles),
      startTag: '<!--STYLES-->',
      endTag: '<!--STYLES END-->',
      fileTmpl: '<link rel="stylesheet", type="text/css", href="/%s">',
      appRoot: ENV.dist_path
    }))
    .pipe(gulp.dest( ENV.dist_path ));

  return;
};

function buildPath(files) {

  for(var f in files)
    files[f] = ENV.dist_path + files[f];

  return files;
}
