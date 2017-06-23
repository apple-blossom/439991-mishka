"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var path = require("path");
var mqpacker = require("css-mqpacker");
var del = require("del");
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var run = require("run-sequence");

gulp.task("serve", ["style"], function() {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("less/**/*.less", ["style"]);
    gulp.watch("*.html").on("change", server.reload);
    gulp.watch("*.html", ["html:update"]);
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
        ], {
            base: "."
        })
        .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
    gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 2 versions"
                ]
            }),
            mqpacker({
                sort: false
            })
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
    return gulp.src("build/img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("svgstore", function() {
    return gulp
        .src("build/img/*.svg")
        .pipe(svgmin(function(file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + "-",
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest("build/img/"));
});



gulp.task("build", function(fn) {
    run(
        "clean",
        "copy",
        "style",
        "images",
        "svgstore",
        fn
    );
});

gulp.task("html:copy", function() {
    return gulp.src("*.html")
        .pipe(gulp.dest("build"));
});
