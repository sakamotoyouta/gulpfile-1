var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var bs	  		  = require('browser-sync');
var plumber 	  = require('gulp-plumber');
var sass 		  = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');

var rootPaths = {
	"htmlRoot" : "./**/*.html",
	"sassRoot" : "./sass/**/*.scss",
	"cssRoot" : "./css/**/*.css",
	"cssAfter" : "./css/",
}

// browserSync
gulp.task( 'bs' , function(){
	bs.init({
		server: {
	      baseDir: "./"
	    },
	    filer: [rootPaths.htmlRoot,rootPaths.cssRoot]
	});
});

// Sassのコンパイルタスク
gulp.task( 'sass' , function(){
	gulp.src( rootPaths.sassRoot )
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./css/'))
		.pipe(bs.reload({
	      stream: true,
	      once  : true
	    }));
});

// autoprefixerのタスク
gulp.task('css-prefix',function(){
	return gulp.src('./css/style.css')
	.pipe(autoprefixer({
		browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
        cascade: false
	}))
	.pipe(gulp.dest(rootPaths.cssAfter));
});

// ブラウザリロード
gulp.task('bs-reload', function () {
    bs.reload();
});

// watchタスク
gulp.task( 'watch' , function(){
	gulp.watch( rootPaths.sassRoot , ['sass'] );
	gulp.watch( rootPaths.htmlRoot , ['bs-reload'] );
	gulp.watch( rootPaths.sassRoot , ['bs-reload'] );
	gulp.watch( rootPaths.cssRoot , ['css-prefix'] );
});

// defaultで実行
gulp.task( 'default' ,['watch','sass','bs-reload','bs','css-prefix']);
