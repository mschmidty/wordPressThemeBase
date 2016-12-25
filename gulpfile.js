//Include gulp
var gulp = require('gulp');

//Include our plugins
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var	sass = require('gulp-sass');
var	autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var	minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var	livereload = require('gulp-livereload');
var	rename = require("gulp-rename");
var cheerio = require('gulp-cheerio');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

//Browser-sync
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './style.css',
    './*.php'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "localhost:8888/host",
    notify: true
    });
});

// Compile Our Sass
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ style: 'expanded', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./'))
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'));
});

gulp.task('svgstore', function () {
    return gulp
        .src('src/svg/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg:true }))
        .pipe(rename('svg.php'))
        .pipe(gulp.dest('template-parts'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/svg/*.svg', ['svgstore']);
});

// Default Task
gulp.task('default', ['styles', 'scripts','watch', 'images', 'svgstore', 'browser-sync']);
