gulp = require('gulp');

var config          = require('../config.js'),
    runSequence     = require('run-sequence'),
    taskLoader      = require('gulp-task-loader'),
    clean           = require('gulp-clean'),
    webserver       = require('gulp-webserver');

ENV = {
    dev_path: '../dev/',
    dist_path: '../dist/',
    main_file: config.main_file,
    build_files:  config.build_files,
    inject_files: config.inject_files
};

taskLoader('gulp_tasks');

gulp.task('default', function() {
    runSequence('build-clean', 'build-bower', ['build-html', 'build-js', 'build-css', 'build-templates', 'build-img', 'build-fonts'], 'build-linker', 'watch', 'webserver');
});

gulp.task('build-clean', function() {
  return gulp.src(ENV.dist_path).pipe(clean({force: true}));
});

gulp.task('watch', function() {
   gulp.watch(ENV.dev_path + '/styles/**/*.css', ['build-css']);
   gulp.watch(ENV.dev_path + '/js/**/*.js', ['build-js']);
   gulp.watch(ENV.dev_path + '/images/**/*.*', ['build-img']);
   gulp.watch(ENV.dev_path + '/templates/**/*.hbs', ['build-templates']);
});

gulp.task('webserver', function() {

  if(config.webserver.active) {
    return gulp.src( ENV.dist_path ).pipe(webserver({ livereload: config.webserver.livereload, open: config.webserver.open }));  
  }

  return;
});

