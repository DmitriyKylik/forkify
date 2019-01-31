const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const svgmin      = require('gulp-svgmin');
const svgStore    = require('gulp-svgstore');
const rename      = require('gulp-rename');
const cheerio     = require('cheerio');
const gCheerio     = require('gulp-cheerio');
const through2    = require('through2');
const consolidate = require('gulp-consolidate');
const config      = require('../config');


gulp.task('sprite:svg', function() {
    return gulp
        .src(`${config.src.iconsSvg}/*.svg`)
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }, {
                removeViewBox: false
            }]
        }))
        .pipe(rename({ prefix: 'icon-' })) // Adding prefix to minified svg icons
        .pipe(svgStore({ inlineSvg: false })) // DissAllow incert svg in html. Getting a svg-sprite file
        .pipe(through2.obj(function(file, encoding, cb) {
            // const $ = file.cheerio;
            const $ = cheerio.load(file.contents.toString(), {xmlMode: true});
            const data = $('svg > symbol').map(function() { // Take every symbol in sprite file and
                // get the attributes from it. Sending it to data obj
                const $this  = $(this);
                const size   = $this.attr('viewBox').split(' ').splice(2); // Get the size of symbol viewBox .split(' ').splice(2);
                const name   = $this.attr('id'); // Get symbol id
                const ratio  = size[0] / size[1]; // symbol width / symbol height
                const fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
                const stroke = $this.find('[stroke]').attr('stroke');
                return {
                    name: name,
                    ratio: +ratio.toFixed(2),
                    fill: fill || 'initial',
                    stroke: stroke || 'initial'
                };
            }).get();
            this.push(file);// Sending the sprite that we get further through stream
            gulp.src(`${__dirname}/_sprite-svg.scss`)
                .pipe(consolidate('lodash', { // Write the default scss properties for each icons via method _.each() in lodath template
                    symbols: data // we passing an array of objects. Each object its a symbol which represents an icon
                }))
                .pipe(gulp.dest(config.src.sassGen));
            gulp.src(`${__dirname}/sprite.html`) // Suppose this part is using when use pug template or some templater that is used for html files
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(gulp.dest(config.src.root));
            cb();
        }))
        .pipe(gCheerio({
            run: function($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('sprite:svg:watch', function() {
    gulp.watch(`${config.src.iconsSvg}/*.svg`, ['sprite:svg']);
});
