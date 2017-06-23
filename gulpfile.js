"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');


gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task('svgstore', function () {
    return gulp
        .src('img/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('img/'));
});

gulp.task('build', ['style'], function() {

    var buildCss = gulp.src([
        'css/style.css'
        ])
    .pipe(gulp.dest('build/css'))

    var buildFonts = gulp.src('fonts/**/*')
    .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('js/**/*')
    .pipe(gulp.dest('build/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('build'));

    var buildSVG = gulp.src('img/img.svg')
    .pipe(gulp.dest('build/img'));

    var buildImg = gulp.src('img/*.jpeg')
    .pipe(gulp.dest('build/img'));

});
