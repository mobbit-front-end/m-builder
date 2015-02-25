var handlebars  = require('gulp-handlebars'),
    wrap        = require('gulp-wrap'),
    declare     = require('gulp-declare'),
    concat      = require('gulp-concat');

module.exports = function() {

    return gulp.src( ENV.dev_path + 'templates//*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest( ENV.dist_path + '/js'));
};