var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    // autoprefixer = require('gulp-autoprefixer'),
    // cleanCSS = require('gulp-clean-css'),
    // rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug');


function css() {
  return gulp.src('./src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    // .pipe(autoprefixer())
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(rename(function(path) {
    // path.extname = ".min.css";
    // }))
    .pipe(gulp.dest('./app/'))      
    .pipe(browserSync.stream());
}

function buildHTML() {
  return gulp.src('./src/*.pug')
    .pipe(pug({
      'pretty': true,
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
      server: {
        baseDir: './app/'
      }
    })
}

gulp.watch('./src/main.scss', css).on('change', browserSync.reload);
gulp.watch('./src/*.pug', buildHTML).on('change', browserSync.reload);
gulp.watch('./src/blocks/**/*.pug', buildHTML).on('change', browserSync.reload);
gulp.watch('./src/blocks/**/*.scss', css).on('change', browserSync.reload);

exports.default = gulp.parallel(css, buildHTML, serve);