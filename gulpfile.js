'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , cache = require('gulp-cached')
  , jshint = require('gulp-jshint')
  , jshintStylish = require('jshint-stylish')
  , jscs = require('gulp-jscs')
  , git = require('gulp-git')
  , todo = require('gulp-todo')
  , argv = require('minimist')(process.argv.slice(2)) || {}
  , bump = require('gulp-bump')
  , paths = {
    app: ['./lib/**/*.js', './index.js']
    , tests: ['./test/**/*.js']
    , meta: ['./gulpfile.js']
  }

gulp.task('default', function(){
  gutil.log(gutil.colors.green('Possible Commands\n'))
  Object.keys(gulp.tasks).sort().forEach(function(task){
    gutil.log('  -', task)
  })
})

gulp.task('lint', function(){
  return gulp.src(paths.app.concat(paths.tests, paths.meta))
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .pipe(todo({
      fileName: 'TODO.md'
    }))
})

gulp.task('test', function(done){
  require('child_process').spawn('npm', ['test'], {stdio: 'inherit', cwd: __dirname})
    .on('close', done)
})

gulp.task('bump', function(){
  return gulp.src('./package.json')
    .pipe(bump({
      type: argv.bump || 'patch'
      , indent: 2
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('gitPrep', function(done){
  var isClean = 'function require_clean_work_tree(){\n'
    + '  # Update the index\n'
    + '  git update-index -q --ignore-submodules --refresh\n'
    + '  err=0\n'
    + '\n'
    + '  # Disallow unstaged changes in the working tree\n'
    + '  if ! git diff-files --quiet --ignore-submodules --\n'
    + '  then\n'
    + '      echo >&2 "You have unstaged changes."\n'
    + '      git diff-files --name-status -r --ignore-submodules -- >&2\n'
    + '      err=1\n'
    + '  fi\n'
    + '\n'
    + '  # Disallow uncommitted changes in the index\n'
    + '  if ! git diff-index --cached --quiet HEAD --ignore-submodules --\n'
    + '  then\n'
    + '      echo >&2 "Your index contains uncommitted changes."\n'
    + '      git diff-index --cached --name-status -r --ignore-submodules HEAD -- >&2\n'
    + '      err=1\n'
    + '  fi\n'
    + '\n'
    + '  if [ $err = 1 ]\n'
    + '  then\n'
    + '      echo >&2 "Please commit or stash them."\n'
    + '      exit 1\n'
    + '  fi\n'
    + '}\n'
    + 'require_clean_work_tree\n'

  require('child_process').exec(isClean, {cwd: __dirname}, done)
})

gulp.task('gitPull', function(done){
  git.pull('origin', 'master', {args: '--rebase'}, done)
})

gulp.task('gitCommit', function(){
  var pkg = require('./package.json')

  return gulp.src('./package.json')
    .pipe(git.commit(pkg.version))
})

gulp.task('tag', function(done){
  var pkg = require('./package.json')

  git.tag('v' + pkg.version, pkg.version, null, done)
})

gulp.task('gitPush', function(done){
  git.push('origin', 'master', {args: '--tags'}, done)
})

gulp.task('npmPublish', function(done){
  require('child_process').spawn('npm', ['publish'], {stdio: 'inherit', cwd: __dirname})
    .on('close', done)
})

gulp.task('publish', [
  'gitPrep'
  , 'gitPull'
  , 'gitPrep'
  , 'lint'
  , 'test'
  , 'bump'
  , 'gitCommit'
  , 'tag'
  , 'gitPush'
  , 'npmPublish'
])
