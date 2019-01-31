const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const spritesmith = require('gulp.spritesmith');
const buffer      = require('vinyl-buffer');
const imagemin    = require('gulp-imagemin');
const config      = require('../config');

gulp.task('sprite:png', function() {
    const spriteData = gulp.src(`${config.src.iconsPng}/*.png`)
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../img/sprite.png',
            cssName: '_sprite-png.scss',
            // retinaSrcFilter: `${config.src.iconsPng}/*@2x.png`,
            // retinaImgName: 'sprite@2x.png',
            // retinaImgPath: '../img/sprite@2x.png',
            cssTemplate: `${__dirname}/scss.template.handlebars`,
            cssVarMap: function(sprite) {
                sprite.name = 'icon-' + sprite.name;
            }
        }));
    const imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest(`${config.dest.img}`));
    spriteData.css
        .pipe(gulp.dest(`${config.src.sassGen}`));
});

gulp.task('sprite:png:watch', function() {
    gulp.watch(`${config.src.iconsPng}/*.png`, ['sprite:png']);
});
