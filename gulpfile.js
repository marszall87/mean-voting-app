'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const babelify = require('babelify');
const merge = require('merge-stream');

var config = {
  root: 'public/',
  js: {
    entrypoint: 'client/app.js',
    src: ['client/**/*.js'],
    dest: 'public/'
  },
  server: {
    src: ['server/**/*.js']
  },
  less: {
    entrypoint: 'client/styles/main.less',
    src: ['client/styles/**/*.less'],
    dest: 'public/styles/'
  },
  assets: [
    {
      src: 'client/**/*.html',
      dest: 'public/'
    },
    {
      src: 'node_modules/font-awesome/fonts/*',
      dest: 'public/fonts'
    }
  ]
};

gulp.task('less', function () {
  return gulp.src(config.less.entrypoint)
    .pipe(plumber({errorHandler: notify.onError()}))
    .pipe(less())
    .pipe(gulp.dest(config.less.dest))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  return gulp.src([].concat(config.js.src).concat(config.server.src))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('js', function () {
  var bundleStream = browserify(config.js.entrypoint)
    .transform('babelify')
    .bundle()
    .on('error', notify.onError());

  return bundleStream
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plumber({errorHandler: notify.onError()}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(connect.reload());
});

gulp.task('watchers', function () {
  gulp.watch(config.js.src, ['lint', 'js']);
  gulp.watch(config.less.src, ['less']);
  gulp.watch(config.assets.map(asset => asset.src), ['assets']);
});

gulp.task('assets', function () {
  const streams = config.assets.map(asset => {
    return gulp.src(asset.src)
      .pipe(gulp.dest(asset.dest))
      .pipe(connect.reload());
  });
  return merge.apply(null, streams);
});

gulp.task('connect', function () {
  connect.server({
    root: config.root,
    livereload: true
  });
});

gulp.task('default', ['lint', 'js', 'less', 'assets']);
gulp.task('watch', ['default', 'watchers', 'connect']);
