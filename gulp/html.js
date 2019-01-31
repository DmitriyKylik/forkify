const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('./config');

// Copy HTML Files
gulp.task('html', function() {
    return gulp.src('src/*')
        .pipe(gulp.dest(`${config.dest.html}`));
});
// reload .on('change', browserSync.reload);
gulp.task('html:watch', function() {
    gulp.watch(`${config.src.root}/*.html`, ['html']);
});
