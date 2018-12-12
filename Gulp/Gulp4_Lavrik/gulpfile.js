const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();


const cssFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/css/some.css',
	'./src/css/other.css'
];								//указываем порядок подключения css

const jsFiles = [
	'./src/js/lib.js',
	'./src/js/some.js'
];

function styles() {
	return gulp.src(cssFiles) //выбираем файлы в папке 
				.pipe(concat('all.css')) //минифицыруем
				.pipe(autoprefixer({
					browsers: ['> 0.1%'],
					cascade: false
				}))			//автопрефиксер
				.pipe(cleanCSS({
					level: 2
				  }))			//сжатие файла
				.pipe(gulp.dest('./build/css')) //ложим в папку 
				.pipe(browserSync.stream());
}

function scripts() {
	return gulp.src(jsFiles) //выбираем файлы в папке 
				.pipe(concat('all.js')) //минифицыруем
				.pipe(uglify({
					toplevel: true
				}
				))			//сжатие файла
				.pipe(gulp.dest('./build/js')) //ложим в папку 
				.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	gulp.watch('./src/css/**/*.css', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./*.html', browserSync.reload);
}

function clean() {
	return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('clean', clean);


gulp.task('build', gulp.series(clean, 
					gulp.parallel(styles, scripts)
					));

gulp.task('dev', gulp.series('build', 'watch'));