const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const pathSRC = './app/src/assets/scss/**/*.scss';
const pathDESTDEV = './app/src/assets/css';
const pathDESTPROD = './app/dist/css';

const pathSRCJS = './app/src/**/*.js';
const pathDESTJS = './app/dist/js';

function buildStyleDev() {
    return gulp.src(pathSRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(pathDESTDEV));
}

function buildStyleProd() {
    return gulp.src(pathSRC)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(pathDESTPROD));
}

// function minifyScript() {
//     return gulp.src(pathSRCJS)
//         .pipe(uglify())
//         .pipe(concat('script.min.js'))
//         .pipe(gulp.dest(pathDESTJS))
// }

function joinScript() {
    return gulp.src('./app/src/**/*.js')
        .pipe(gulp.dest(pathDESTJS))
}

exports.buildStyleDev = buildStyleDev;
exports.buildStyleProd = buildStyleProd;
// exports.minifyScript = minifyScript;
exports.joinScript = joinScript;

exports.watch = function () {
    gulp.watch(pathSRC, gulp.series(buildStyleDev));
    gulp.watch(pathSRC, gulp.series(buildStyleProd));
    // gulp.watch(pathSRCJS, gulp.series(minifyScript));
    gulp.watch(pathSRCJS, gulp.series(joinScript));
}