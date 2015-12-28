var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');

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
  assets: {
    // src: 'node_modules/font-awesome/fonts/*',
    src: [],
    dest: 'public/assets/'
  }
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
    .bundle()
    .on('error', notify.onError());

  bundleStream
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plumber({errorHandler: notify.onError()}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(config.js.src, ['lint', 'js']);
  gulp.watch(config.less.src, ['less']);
  gulp.watch(config.assets.src, ['assets']);
});

gulp.task('assets', function () {
  return gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: config.root,
    livereload: true
  });
});

gulp.task('default', ['lint', 'js', 'less', 'assets', 'watch', 'connect']);
