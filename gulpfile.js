// var notify = require("gulp-notify");
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    plumber = require('gulp-plumber'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify');

//file location paths
var path = {
  js: ['./assets/js/index.js'],
  css: ['./assets/css/main.scss'],
}

//browserify to import dependencies
gulp.task('browserify', function() {
  return browserifySetup();
})

//browser-sync
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8000",
    files: ["assets/js/bundle.js", "assets/css/bundle.css", "assets/index.html"],
    browser: "chrome",
    port: 7000,
    online: true
  });
})

//gulp-webserver to make pages accessible on localhost
gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script:'./server.js',
    ignore: ['assets/js/components/*', 'assets/css/**/*']
  })
    .on('start', function() {
      if (!started) {
        cb();
        started = true;
      }
    });
});

//sass to compile css
gulp.task('sass', function() {
  gulp.src(path.css)
    .pipe(plumber({
      errorHandler: function (err) {
          gutil.log( gutil.colors.yellow(err.message));
          gutil.beep();
          this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('bundle.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/css/'))
});

gulp.task('default', ['browser-sync', 'browserify'], function() {
  gulp.watch('./assets/css/**/*.scss', ['sass']);
});

//====== helper functions =====//

//finds dependencies and updates on changes with watchify
function browserifySetup() {
  var b = browserify( path.js, {
    transform: [['babelify', {'presets': ["es2015", "react"]}], ['browserify-css', {autoInject: true}]],
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true,
  });
  b = watchify(b);
  rebundle(b);
  b.on('update', function() {
    gutil.log('updating dependencies');
    rebundle(b);
  });
};

function rebundle(b) {
  var stream = b.bundle()
  return stream
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
};