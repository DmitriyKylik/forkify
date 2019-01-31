const gulp = require('gulp');
const include = require('gulp-include');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const through = require('through2');
const rename = require('gulp-rename');
const config = require('./config');

gulp.task('js', function() {
    return gulp.src(`${config.src.js}/app.js`)
        .pipe(sourcemaps.init())
        .pipe(include())
        .on('error', config.errorHandler.onError('JS Error include file'))
        .pipe(babel())
        .on('error', config.errorHandler.onError('Error: <%= error.message %>'))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', config.errorHandler.onError({
            message: [
                'Error: <%= error.message %>',
                '\n<%= error.cause %>',
                '\nLine: <%= error.cause.line %>',
                '\nPosition: <%= error.cause.pos %>',
                '\n<%= error.fileName %>'
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${config.dest.js}/`))
        .pipe(browserSync.stream({ once: true }));
});

gulp.task('copy:jsLib', function() {
    return gulp.src(`${config.src.js}/lib/*js`)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .on('error', config.errorHandler.onError('JS lib minify error'))
        .pipe(gulp.dest(`${config.dest.jsLib}/`));
});

gulp.task('js:watch', function() {
    gulp.watch(`${config.src.js}/*.js`, ['js']);
});

// gulp.task('js', function() {
//     return gulp.src(`${config.src.js}/*.js`)
//         // .pipe(sourcemaps.init())
//         .pipe(include())
//         .on('error', config.errorHandler.onError('JS Error include file'))
//         // .pipe(babel())
//         // .on('error', config.errorHandler.onError('Error: <%= error.message %>'))
//         .pipe(named())
//         .pipe(webpack({
//             // entry: {
//             //     app: 'src/js/app.js'
//             // },
//             output: {
//               filename: '[name].js'
//             },
//             devtool: 'source-map',
//             module: {
//               rules: [
//                 {
//                   test: /\.(js)$/,
//                   exclude: /(node_modules)/,
//                   loader: 'babel-loader',
//                   query: {
//                     presets: ['@babel/preset-env']
//                   }
//                 }
//               ]
//             }
//             // resolve: {
//             //     extensions: ['.js']
//             // }
//         }))
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(through.obj(function (file, enc, cb) {
//             // Dont pipe through any source map files as it will be handled
//             // by gulp-sourcemaps
//             const isSourceMap = /\.map$/.test(file.path);
//             if (!isSourceMap) this.push(file);
//             cb();
//         }))
//         .pipe(concat('app.js'))
//         // .pipe(uglify())
//         // .on('error', config.errorHandler.onError({
//         //     message: [
//         //         'Error: <%= error.message %>',
//         //         '\n<%= error.cause %>',
//         //         '\nLine: <%= error.cause.line %>',
//         //         '\nPosition: <%= error.cause.pos %>',
//         //         '\n<%= error.fileName %>'
//         //     ]
//         // }))
//         // .pipe(rename('app.min.js'))
//         // .pipe(gulp.dest(`${config.dest.js}/`))
//         // .pipe(rename({suffix: '.min'}))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(`${config.dest.js}/`))
//         .pipe(browserSync.stream({ once: true }));
// });
