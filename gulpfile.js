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

gulp.task('partials', function(){
    console.log("read partials");
    var dirPath = "assets/partials";
    fs.readdir(dirPath, function(err, dirFileList){
        if(!err)
            if(dirFileList.length > 0){
                var templateObject = {};
                for(var i=0; i< dirFileList.length; i++){
                    var fileName = dirFileList[i];
                    var field = fileName.split('.')[0];
                    var fileData = fs.readFileSync(dirPath+"/"+fileName);
                    templateObject[field] = fileData.toString();
                }
                fs.writeFile('./assets/js/partials.js', "window['template']="+JSON.stringify(templateObject), function(err){
                    if(!err)
                        console.log("file write");
                });
            }
        else
            console.log("read dir error");
    });
});

gulp.task('watch',  function(){
    gulp.watch('assets/less/**/*.less', ['less']);
    gulp.watch('assets/js/**/*.js', ['js']);
    gulp.watch('assets/partials/*.html',['partials','js']);
});

gulp.task('default', ['partials', 'less', 'watch', 'js']);
