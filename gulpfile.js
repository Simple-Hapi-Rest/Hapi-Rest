
const gulp = require('gulp');
const eslint = require('eslint');
const mocha = require('mocha');

var files = ['gulpfile.js', 'server.js', 'config.js', 'database.js'];
var testFiles = ['/test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(file, testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  gulp.watch(testFiles, files, ['default']);
});

gulp('default', ['lint', 'test']);
