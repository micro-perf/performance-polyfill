var gulp = require('gulp');
var karma = require('karma').server;
var jscs = require('gulp-jscs');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fs = require("fs");


gulp.task('jscs', function () {
	return gulp.src(__dirname+'/src/*.js')
		.pipe(jscs());
});

gulp.task('test', function(done) {
    return karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function(){
		fs.readFile(__dirname + '/build/reports/coverage/text-summary.txt', "utf-8", function(err, _data) {
	    	console.log(_data);
	    });
	});
});

gulp.task('merge', function(){
	return gulp.src(__dirname+'/src/*.js')
		.pipe(concat('perf.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('perf.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
	gulp.src(__dirname + '/dist/*.js')
	// Perform minification tasks, etc here
	.pipe(gulp.dest('./'));
});


gulp.task('default', ['jscs','test','merge','copy']);
