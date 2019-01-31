const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const config = require('./config');

const processors = [
    autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    }),
    csso
];

gulp.task('sass', function() {
    return gulp.src(`${config.src.sass}/*.{sass,scss}`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', config.errorHandler.onError('Error: <%= error.message %>'))
        .pipe(rename('app.min.css'))
        .pipe(postcss(processors))
        .on('error', config.errorHandler.onError('Error: <%= error.message %>'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${config.dest.css}/`));
});

gulp.task('sass:watch', function() {
    gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, ['sass']);
});

// Defining the order of media-queries in build css file based on the used screen size in the rule

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }
    return 1;
}
