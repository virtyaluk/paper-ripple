import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import esdoc from 'gulp-esdoc';
import concat from 'gulp-concat';
import mochaPhantomJS from 'gulp-mocha-phantomjs';
import iife from 'gulp-iife';

const banner = `/*
 * This file/code is part of Paper UI project.
 *
 * Paper UI - is a modern front-end framework based on Material Design by Google
 * https://github.com/virtyaluk/paper-ui
 *
 * Copyright (c) 2015 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */
 `,
    jsSource = ['src/js/ElementRect.js', 'src/js/PaperWave.js', 'src/js/PaperRipple.js'],
    main = 'PaperRipple.js';

gulp.task('lint', () =>
    gulp.src(['src/js/*.js', 'gulpfile.babel.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del(['dist/', 'docs/']));

gulp.task('transpile-js:umd', () =>
    gulp.src(jsSource)
        .pipe(concat(main))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-class-properties', 'transform-es2015-modules-umd'],
            moduleIds: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(gulp.dest('dist'))
);

gulp.task('minify-js:umd', ['transpile-js:umd'], () =>
    gulp.src('dist/PaperRipple.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
);

gulp.task('transpile-js:systemjs', () =>
    gulp.src(jsSource)
        .pipe(concat(main))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-class-properties', 'transform-es2015-modules-systemjs'],
            moduleIds: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(gulp.dest('dist/systemjs'))
);

gulp.task('minify-js:systemjs', ['transpile-js:systemjs'], () =>
    gulp.src('dist/systemjs/PaperRipple.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/systemjs'))
);

gulp.task('styles', ['clean'], () =>
    gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
);

gulp.task('docs', ['lint'], () => gulp.src('./src').pipe(esdoc()));

gulp.task('transpile-js:jquery-plugin', () =>
    gulp.src(['src/js/ElementRect.js', 'src/js/PaperWave.js', 'src/js/PaperRipple.js', 'src/js/paperRipple.jquery.js'])
        .pipe(concat('paperRipple.jquery.js'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-class-properties']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(iife({
            useStrict: false,
            params: ['window', '$', 'module'],
            args: ['window', 'jQuery', '{}']
        }))
        .pipe(header(banner))
        .pipe(gulp.dest('dist'))
);

gulp.task('minify-js:jquery-plugin', ['transpile-js:jquery-plugin'], () =>
    gulp.src('dist/paperRipple.jquery.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
);

gulp.task('scripts', ['clean', 'minify-js:systemjs', 'minify-js:umd', 'minify-js:jquery-plugin']);

gulp.task('test', ['scripts', 'styles'], () => gulp.src('test/runner.html').pipe(mochaPhantomJS({ reporter: 'spec' })));

gulp.task('test:ci', ['scripts', 'styles'], () =>
    gulp.src('test/runner.html')
        .pipe(mochaPhantomJS({
            reporter: 'xunit',
            output: 'test/results/result.xml'
        }))
);

gulp.task('ci', ['lint', 'test:ci']);

gulp.task('default', ['clean', 'lint', 'scripts', 'styles', 'docs', 'test']);