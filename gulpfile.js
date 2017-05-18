var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
gulp.task('default', function() {
return gulp.src('src/index.jsx')
  .pipe(webpackStream( require('./webpack.config.js'), webpack ))
  .pipe(gulp.dest('dist/'));
});
