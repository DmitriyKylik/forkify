const gulp = require('gulp');
const del = require('del');

// Clean Build Folder
gulp.task('clean', function() {
    return del(['build']);
});
