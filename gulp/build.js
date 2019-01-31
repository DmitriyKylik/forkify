const gulp = require('gulp');
const runSequence = require('run-sequence');


function build(cb) {
    runSequence(
        'clean',
        'copy',
        'minifyImg',
        'sprite:png',
        'sprite:svg',
        'html',
        'sass',
        'js',
        cb
    );
}

// Build task sequence
gulp.task('build', function(cb) {
    build(cb);
});
