

'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var rtlcss          = require('gulp-rtlcss');
var rename          = require('gulp-rename');
var flatten         = require('gulp-flatten');
var concat          = require('gulp-concat');
var minifyCss       = require('gulp-minify-css');
var mergeJson       = require('gulp-merge-json');
var wiredep         = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var inject          = require('gulp-inject');
var browserSync     = require('browser-sync').create();
var uglify          = require('gulp-uglify');
var bowerJson       = require('./bower.json');
var runSequence	  = require('run-sequence');
var print 	        = require('gulp-print');
var history 		  = require('connect-history-api-fallback');
var deleteFile		  = require('gulp-delete-file');

gulp.task('sass:build', function () {
    return gulp.src('./src/assets/sass/**/*.s*ss')
               .pipe(sass().on('error', sass.logError))
               .pipe(flatten())
               .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9']))
               .pipe(gulp.dest('./dist/assets/css')) // Output LTR stylesheets.
					.pipe(browserSync.stream())
               .pipe(rtlcss()) // Convert to RTL.
               .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
               .pipe(gulp.dest('./dist/assets/css')) // Output RTL stylesheets.
               .pipe(browserSync.stream());
});

gulp.task('style:dev',['sass:build'], function () {
    var ltrCss = gulp.src(['./dist/assets/css/main.css','./dist/assets/css/style.css']);

 	 return  gulp.src('./dist/index.html')
               .pipe(inject(ltrCss, {relative: true}))
               .pipe(gulp.dest('./dist'));
});

gulp.task('style:dist',['sass:build'], function () {
    var ltrCss = gulp.src(['./dist/assets/css/main.css','./dist/assets/css/style.css'])
               .pipe(concat('bp.min.css'))
               .pipe(minifyCss())
               .pipe(gulp.dest('./dist/assets/css'));

    var rtlCss = gulp.src(['./dist/assets/css/main-rtl.css','./dist/assets/css/style-rtl.css'])
               .pipe(concat('bp-rtl.min.css'))
               .pipe(minifyCss())
               .pipe(gulp.dest('./dist/assets/css'));

	return  gulp.src('./dist/index.html')
               .pipe(inject(ltrCss, {relative: true}))
               .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function () {
		return gulp.src(['./src/**/*.*','!./src/app/**/*.js', '!./src/assets/sass/**/*.*', '!./src/i18n/**/*.*'])
				  .pipe(gulp.dest('./dist'));
});

gulp.task('mergeJson', function () {
    var faJson = gulp.src('./src/i18n/fa/*.json')
					.pipe(mergeJson({fileName:'fa.json'}))
					.pipe(gulp.dest('./dist/i18n'));
    var enJson = gulp.src('./src/i18n/en/*.json')
					.pipe(mergeJson({fileName:'en.json'}))
					.pipe(gulp.dest('./dist/i18n'));
    return [faJson, enJson];
});

gulp.task('wiredep:dev', function () {
  return gulp.src('./dist/index.html')
					.pipe(wiredep())
					.pipe(gulp.dest('./dist'));
});

gulp.task('wiredep:dist', function () {
  return gulp.src('./dist/index.html')
					.pipe(wiredep({ "overrides": bowerJson.distOverrides}))
					.pipe(gulp.dest('./dist'));
});

gulp.task('angular:dev', function () {
    var angularFiles = gulp.src(['./src/app/**/*.js'])
                           .pipe(angularFilesort())
									.pipe(gulp.dest('./dist/app'));

    return gulp.src('./dist/index.html')
               .pipe(inject(angularFiles, {relative: true, starttag: '<!-- angular -->', endtag: '<!-- endangular -->'}))
               .pipe(gulp.dest('./dist'));

});

gulp.task('angular:dist', function () {
    var angularFiles = gulp.src(['./src/app/**/*.js'])
					.pipe(angularFilesort())
					.pipe(concat('app.min.js'))
					.pipe(uglify())
					.pipe(gulp.dest('./dist/assets/js'));

    return gulp.src('./dist/index.html')
               .pipe(inject(angularFiles, {relative: true, starttag: '<!-- angular -->', endtag: '<!-- endangular -->'}))
               .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
				middleware: [history()]
        }
    });

	 gulp.watch('assets/sass/**/*.s*ss', {cwd:'./src'}, ['sass:build']);
	 gulp.watch(['**/*.*','!app/**/*.js', '!index.html', '!assets/sass/**/*.*', '!i18n/**/*.*'], {cwd:'./src'}).on('change',
	 function (ev) {
		 if (ev.type=='changed' || ev.type=='added') {
			 gulp.src(ev.path, {base: './src'}).pipe(gulp.dest('./dist', {  }));
		 } else if (ev.type=='deleted') {
			 var path = ev.path.replace('src/','dist/').replace('src\\','dist\\');
			 gulp.src(path).pipe(deleteFile({ deleteMatch: true}));
		 }
		 browserSync.reload();
	 });
	 gulp.watch("i18n/en/*.json", {cwd:'./src'}).on('change', runSequenceTaskAndReloadBrowser('mergeJson'));
    gulp.watch("app/**/*.js", {cwd:'./src'}).on('change', runSequenceTaskAndReloadBrowser('angular:dev'));
});


gulp.task('dist', callback => {
	runSequence('copy' ,'mergeJson','angular:dist',  'style:dist', 'wiredep:dist');
});

gulp.task('dev', callback => {
	runSequence('copy', 'mergeJson','angular:dev', 'style:dev', 'wiredep:dev', 'serve');
});

function runSequenceTaskAndReloadBrowser(taskName) {
	return function() {
		runSequence(taskName, function(){
			browserSync.reload()
		});
	}
}
