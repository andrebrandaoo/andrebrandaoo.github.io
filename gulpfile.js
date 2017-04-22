// global
const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const rename = require('gulp-rename')
const flatten = require('gulp-flatten')
const gls = require('gulp-live-server')
const env = require('gulp-env')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// css
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const jeet = require('jeet')
const rupture = require('rupture')
const groupMediaQueries = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const animate = require('animate-stylus-npm')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer-stylus')

// html
const nunjucks = require('gulp-nunjucks-render')
const glob = require('glob')
const prettify = require('gulp-html-prettify')
const htmlmin = require('gulp-htmlmin')

// js
const uglify = require('gulp-uglify')
const webpackSourcemaps = require('gulp-webpack-sourcemaps')
const gutil = require('gulp-util')

/**
 * Enviroment variables
 */
if (fs.existsSync('.env.json')) {
  env('.env.json')
  if (gutil.env.env) {
    env.set({env: gutil.env.env})
  }
}

function prod() {
  return process.env.env === 'production'
}

function noop() {
  return gutil.noop()
}

const plumberConfig = {
  errorHandler: notify.onError("[<%= error.plugin %>] <%= error.name %>\n <%= error.message %>")
}


/**
 * Tasks
 */
gulp.task('css', () => {
  return gulp.src('./src/css/index.styl')
    .pipe(plumber(plumberConfig))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [jeet(), rupture(), autoprefixer({browsers: ['ie 9', '> 1%']}), poststylus(['postcss-flexibility'])],
      include: ['./node_modules/../', animate.path],
      'include css': true
    }))
    .pipe(groupMediaQueries())
    .pipe(prod() ? cleanCSS() : noop())
    .pipe(flatten({includeParents: [1,1]}))
    .pipe(sourcemaps.write({ includeContent: true, sourceRoot: __dirname }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css/'))
})


gulp.task('html', () => {
  return gulp.src('./src/html/*.html')
    .pipe(plumber(plumberConfig))
    .pipe(nunjucks({
      path: ['./src/html/', './src/modules']
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./'))
})


gulp.task('js', () => {
  const config = {
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader'
      }]
    },
    resolve: {
      modulesDirectories: ['./src/modules', './node_modules']
    }
  }
  return gulp.src('./src/js/*bundle.js')
    .pipe(plumber(plumberConfig))
    .pipe(sourcemaps.init())
    .pipe(webpackSourcemaps(config))
    .pipe(prod() ? uglify() : noop())
    .pipe(flatten({includeParents: [1,1]}))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/js/'))

})

gulp.task('build', ['css', 'html', 'js'])

gulp.task('server', () => {
  let server = gls('server.js', undefined, process.env.lr_port || 35729)
  server.start()

  gulp.watch(['./src/css/**/*.styl', './src/modules/**/*.styl'], ['css'])
  gulp.watch(['./src/js/**/*.js', './src/modules/**/*.js'], ['js'])
  gulp.watch(['./src/html/**/*.html', './src/html/.template.html', './src/modules/**/*.html'], ['html'])

  gulp.watch(['./*.html', './assets/css/**/*.css', './assets/js/**/*.js'], (file) => {
    server.notify.apply(server, [file])
  })

  gulp.watch(['server.js', 'api.js'], () => server.start.bind(server)())
})

gulp.task('default', ['build', 'server'])
