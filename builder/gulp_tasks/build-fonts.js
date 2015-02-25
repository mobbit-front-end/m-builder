module.exports = function() {

    return gulp.src( ENV.dev_path + '/fonts/**/*' )
        .pipe(gulp.dest( ENV.dist_path + '/fonts') );
};