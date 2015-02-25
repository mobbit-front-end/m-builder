module.exports = function() {

    return gulp.src( ENV.dev_path + 'images/**/*.*' )
    	.pipe(gulp.dest(ENV.dist_path + '/images'));
};
