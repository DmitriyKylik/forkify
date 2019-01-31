const gulp = require('gulp');
// const config = require('./config');

// Watcher
// gulp.task('watch', function() {
//     gulp.watch(`${config.src.js}/*`, ['js']);
//     gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, ['sass']);
//     gulp.watch(`${config.src}/*.html`, ['copy']);
// });

gulp.task('watch',
    [
    //     'copy:watch',
        'sprite:svg:watch',
        'watch:img',
        'sprite:png:watch',
        'sass:watch',
        'html:watch',
        'js:watch'
    ]);
