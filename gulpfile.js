const gulp = require('gulp');
const gLess = require('gulp-less');
const concat = require('gulp-concat');
const sourceMaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";
const fs = require('fs');

gulp.task('less', function(){
    // return gulp.src(['assets/less/**/*.less', 'bower_components/fullpage.js/dist/jquery.fullpage.css'])
    return gulp.src([
      'assets/less/*.less',
      'bower_components/fullpage.js/dist/jquery.fullpage.css',
      './bower_components/lightcase-2.3.4/src/css/lightcase.css'

    ])

        .pipe(gulpIf(isDevelopment, sourceMaps.init()))
        .pipe(gLess({
            path:['/assets/less/']
        }))
        .pipe(gulpIf(isDevelopment, sourceMaps.write()))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('js', function(){
    console.log("JS compile");
    var jsFiles = JSON.parse(fs.readFileSync("assets/js-map-file.json"))["main.js"];
    gulp.src(jsFiles)
        .pipe(concat("main.js"))
        .pipe(gulp.dest('./public/javascripts'))

});

gulp.task('watch',  function(){
    gulp.watch('assets/less/**/*.less', ['less']);
    gulp.watch('assets/js/**/*.js', ['js']);
});

gulp.task('default', ['less', 'watch', 'js']);
