const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['gulpfile.js', 'server.js', 'config.js', 'database.js'];
var testFiles = ['/test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(files, testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('mocha', () => {
  return gulp.src('test/**/*test.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(testFiles, files, ['default']);
});

gulp.task('default', ['lint', 'test']);
