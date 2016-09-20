var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

// Modules for the webserver
// This is just for a demo - remove this section
// in lieu of a full-fledged server
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrServer = require('tiny-lr')(),
    express = require('express'),
    liveReload = require('connect-livereload'),
    livereloadPort = 35729,
    serverport = 5000,
    path = require('path');

var server = express();
server.use(liveReload({ port: livereloadPort}));
server.use(express.static('/dist'));
server.use('/assets', express.static(path.join(__dirname + '/dist/assets')));
server.all('/', function(req, res){
  res.sendfile('index.html', { root: "dist" });
})

gulp.task('dev', function() {
  server.listen(serverport);
  lrServer.listen(livereloadPort);
  gulp.run('watch');
})

gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

gulp.task('browserify', function() {
  gulp.src(['app/scripts/main.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/assets/js'));
})

gulp.task('views', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'))

  gulp.src('app/views/**/*')
    .pipe(gulp.dest('dist/assets/views'))
    .pipe(refresh(lrServer));

})

gulp.task('watch', ['lint'], function() {
  gulp.watch(
    ['app/scripts/*.js', 'app/scripts/**/*.js'],
    ['lint', 'browserify']
  );

  gulp.watch(
    ['app/index.html', 'app/views/**/*.html'],
    ['views']
  );
})
