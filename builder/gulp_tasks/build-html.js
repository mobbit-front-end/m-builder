module.exports = function() {

    return gulp.src( ENV.dev_path + 'index.html' )
        .pipe(gulp.dest( ENV.dist_path ));
};