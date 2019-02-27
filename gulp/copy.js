const gulp = require('gulp');
const config = require('./config');


gulp.task('copy:fonts', function() {
    return gulp.src(`${config.src.fonts}/*.{ttf,eot,woff,woff2}`)
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy', [
    'copy:jsLib'
]);
