const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const path = require('path');
const config = require('./config');
// , `!${config.src.img}/svgo/**/*.*`
gulp.task('minifyImg', function() {
    return gulp
        .src([
            `${config.src.img}/**/*.{jpg,png,jpeg,svg,gif}`
        ])
        .pipe(cached('images'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: false}
                ]
            })
        ]))
        .on('error', config.errorHandler.onError('Error: <%= error.message %>'))
        .pipe(remember('images'))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('watch:img', function() {
    gulp.watch(`${config.src.img}/*.*`, ['minifyImg']).on('change', function(event) {
        delete cached.caches.images[event.path];
        remember.forget('images', event.path);
    });
});
