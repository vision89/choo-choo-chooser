var gulp = 			require('gulp');
var connect = 		require('gulp-connect');
var sass = 			require('gulp-sass');
var concat = 		require('gulp-concat');
var uglify = 		require('gulp-uglify');
var htmlmin =    	require('gulp-htmlmin');
var mergeStream = 	require('merge-stream');
var babel = 		require('gulp-babel');
var sourcemaps = 	require('gulp-sourcemaps');
var inject = 		require('gulp-inject');
var shell = 		require('gulp-shell');
var jshint = 		require('gulp-jshint');
var stylish = 		require('jshint-stylish');
var rimraf = 		require('gulp-rimraf');
var browserSync = 	require('browser-sync').create();

/**************
  Lint
***************/   
gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint().on('error', function(err) {
      console.log('Lint: ', err);
    }))
    .pipe(jshint.reporter(stylish));
});

/***************
  Docs
****************/
gulp.task('js-doc', shell.task(['./node_modules/jsdoc/jsdoc.js -r ./app/js -d ./docs']));

/****************
  Serve
 ****************/ 
gulp.task('serve-docs', function() {
  	browserSync.init({
	    server: {
	        baseDir: "./docs",
	        port: 8800
	    }
	});
});
 
gulp.task('serve', function() {
  browserSync.init({
        server: {
            baseDir: "./dev",
            port: 8080
        }
    });
});

gulp.task('serve-dist', function() {
	browserSync.init({
	    server: {
	        baseDir: "./dist",
	        port: 8880
	    }
	});
});

/******************
  Clean
*******************/
var cleanTask = function(dir) {

	return gulp.src('./' + dir + '/*', { read: false }).pipe(rimraf().on('error', function(err) {

	    console.log('Rimraf: ', err)

	  }));

};

gulp.task('dev-clean', function() {

	return cleanTask('dev');

});

gulp.task('dist-clean', function() {

	return cleanTask('dist');

});

/******************
	Copy
*******************/
var copyTask = function(dir) {

	return mergeStream(
		gulp.src('./app/assets/**/*').pipe(gulp.dest('./' + dir + '/assets')),
		gulp.src('./bower_components/**/*').pipe(gulp.dest('./' + dir + '/bower_components'))
		.pipe(browserSync.stream())
	);

}

gulp.task('dev-copy', function () {

	return copyTask('dev');
	
});

gulp.task('dist-copy', function () {

	return copyTask('dist');
	
});

/******************
	Styles
*******************/
var styleTask = function(dir) {

	return gulp.src('./app/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./' + dir + '/css'))
		.pipe(browserSync.stream());

}

gulp.task('dev-styles', function() {

	return styleTask('dev');
	
});

gulp.task('dist-styles', function() {

	return styleTask('dist');
	
});

/******************
	JS
*******************/
gulp.task('dev-js', function() {

    gulp.src('./app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({comments: false}).on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/js'))
    .pipe(browserSync.stream())

});

gulp.task('dist-js', function() {

    gulp.src('./app/js/**/*.js')
    .pipe(babel({comments: false}).on('error', function(e){
            console.log('Bablify Error: ', e);
         }))
    .pipe(uglify().on('error', function(e){
            console.log('Uglify Error: ', e);
         }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())

});

/******************
	html
*******************/
gulp.task('dev-concat-minify', function() {

	return gulp.src('./public/index.html')
		.pipe(inject(gulp.src(['./app/partials/**/*.html']), {
		  starttag: '<!-- inject:body:{{ext}} -->',
		  transform: function(filePath, file) {
		    return file.contents.toString('utf8')
		  }
		}).on('error', function(e) {
		  console.log('Inject Error: ', e)
		}))
		.pipe(htmlmin())
		.pipe(gulp.dest('./dev'))
		.pipe(browserSync.stream());
});

gulp.task('dist-concat-minify', function() {
	return gulp.src('./public/index.html')
		.pipe(inject(gulp.src(['./public/partials/**/*.html']), {
		  starttag: '<!-- inject:body:{{ext}} -->',
		  transform: function(filePath, file) {
		    return file.contents.toString('utf8')
		  }
		}).on('error', function(e) {
		  console.log('Inject Error: ', e)
		}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'))
});

/******************
	tasks
*******************/
gulp.task('dev', ['dev-clean'], ['dev-copy', 'dev-styles', 'lint', 'dev-js', 'dev-concat-minify', 'js-doc', 'watch']);
gulp.task('dist', ['dist-clean'], ['dist-copy', 'dist-styles', 'lint', 'dist-js', 'dist-concat-minify']);
gulp.task('default', ['dev', 'serve', 'serve-docs']);
gulp.task('watch', ['dev-copy', 'dev-styles', 'lint', 'dev-js', 'dev-concat-minify', 'js-doc'], function() {

	gulp.watch(['./public/**/*'], ['dev']);

});