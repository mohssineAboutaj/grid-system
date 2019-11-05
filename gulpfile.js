const gulp = require('gulp'),
      gulpSass = require('gulp-sass'),
      gulpPug = require('gulp-pug'),
      gulpJasmine = require('gulp-jasmine'),
      gulpConcatCss = require('gulp-concat-css'),
      gulpConcatJs = require('gulp-concat'),
      browserSync = require('browser-sync'),
      gulpRename = require('gulp-rename'),
      gulpAutoprefixer = require('gulp-autoprefixer'),
      config = require('./config');

// get path of files & folder
const {
  docs,
  docsCss,
  docsJs,
  jsList,
  cssList,
  sassFiles,
  sassMain,
  pugFiles,
  pugMain,
  cssFolder,
  port,
  specFiles,
} = config;

// fuction to handle the errors
function handleErr(err) {
  if (err) {
    console.log(err)
  }
}

gulp.task('sass-task', () => {
  return gulp.src(sassMain)
        .pipe(gulpSass())
        .on('error', handleErr)
        .pipe(gulp.dest(cssFolder))
        .pipe(browserSync.stream())
});

// build task
gulp.task('build-css-task', ['sass-task'], () => {
  let excludedPath = sassMain.split("/")
  let file = excludedPath[excludedPath.length - 1]
  let fileAfterRenaming = file.replace(/.scss/ig,".min.css")

  return gulp.src(sassMain)
        .pipe(gulpSass({
          outputStyle: 'compressed',
        }))
        .pipe(gulpRename(fileAfterRenaming))
        .pipe(gulpAutoprefixer())
        .on('error', handleErr)
        .pipe(gulp.dest(cssFolder))
});

// pug task
gulp.task('pug-task', () => {
  gulp.src(pugMain)
      .pipe(gulpPug({
        pretty: true,
      }))
      .on('error', handleErr)
      .pipe(gulp.dest(docs))
      .pipe(browserSync.stream())
});

// javaScript task for docs
gulp.task('docs-js-task', () => {
  gulp.src(jsList)
      .pipe(gulpConcatJs("docs.script.js"))
      .pipe(gulp.dest(docsJs))
      .pipe(browserSync.stream())
});

// javaScript task for docs
gulp.task('docs-css-task', () => {
  gulp.src(cssList)
      .pipe(gulpConcatCss("docs.style.css"))
      .pipe(gulp.dest(docsCss))
      .pipe(browserSync.stream())
});

// build docs task
gulp.task('build-docs-task', [
  'pug-task',
  'sass-task',
  'docs-css-task',
  'docs-js-task',
]);

// testing task
gulp.task('test-task', () => {
  gulp.src(specFiles)
      .pipe(gulpJasmine());
});

// testing with watching task
gulp.task('test-watch-task', ['test-task'], () => {
  gulp.watch(specFiles, ['test-task'])
});

// server & hotReload taks
gulp.task('server-task', () => {
  browserSync.init({
    server: docs,
    port: port,
    ui: false,
  })
});

// watch task
gulp.task('watch-task', () => {
  // watch sass files & run the sass task
  gulp.watch(sassFiles, ['sass-task']);

  // watch pug files & run the pug task
  gulp.watch(pugFiles, ['pug-task']);

  // watch css files & run the pug task
  gulp.watch(cssList, ['docs-css-task']);

  // watch pug files & run the pug task
  gulp.watch(jsList, ['docs-js-task']);
});

// default task
gulp.task('default', [
  'docs-css-task',
  'docs-js-task',
  'pug-task',
  'sass-task',
  'watch-task',
  'server-task',
]);