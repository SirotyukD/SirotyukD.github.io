
   'use strict';

   var gulp = require('gulp'),
	   mainBowerFiles = require('main-bower-files'),
	   watch = require('gulp-watch'),
	   autoprefixer = require('gulp-autoprefixer'),
	   uglify = require('gulp-uglify'),
	   sourcemaps = require('gulp-sourcemaps'),
	   sass = require('gulp-sass'),
	   concat = require('gulp-concat'),
	   cleanCSS = require('gulp-clean-css'),
	   imagemin = require('gulp-imagemin'),
	   pngquant = require('imagemin-pngquant'),
	   rimraf = require('rimraf'),
	   browserSync = require("browser-sync"),
	   reload = browserSync.reload;

   var path = {
	   vendor: {
		   js: 'app/js/',
		   css: 'app/css/'
	   },
	   dist: { //Тут мы укажем куда складывать готовые после сборки файлы
		   html: 'dist/',
		   modules: 'dist/modules/',
		   js: 'dist/js/',
		   scss: 'dist/css/',
		   css: 'dist/css/',
		   img: 'dist/img/',
		   fonts: 'dist/fonts/'
	   },
	   app: { //Пути откуда брать исходники
		   html: 'app/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
		   modules: 'app/modules/**/*.*',
		   js: 'app/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
		   scss: 'app/scss/*.scss',
		   css: 'app/css/*.css',
		   img: 'app/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		   fonts: 'app/fonts/**/*.*'
	   },
	   watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		   html: 'app/**/*.html',
		   js: 'app/js/**/*.js',
		   scss: 'app/scss/**/*.scss',
		   css: 'app/css/**/*.css',
		   img: 'app/img/**/*.*',
		   fonts: 'app/fonts/**/*.*',
		   modules: 'app/modules/**/*.*'
	   },
	   clean: './dist'
   };


   var config = {
	   server: {
		   baseDir: "./dist"
	   },
	   tunnel: true,
	   host: 'localhost',
	   port: 8081,
	   logPrefix: "SirotukD"
   };

   // gulp.task('vendorJs:build', function () {
   // 	return gulp.src( mainBowerFiles('**/*.js') ) //Выберем файлы по нужному пути
   // 		.pipe(gulp.dest(path.vendor.js)) //Выплюнем готовый файл в app
   // });

   // gulp.task('vendorCss:build', function () {
   // 	return gulp.src( mainBowerFiles('**/*.css') ) //Выберем файлы по нужному пути
   // 		 .pipe(gulp.dest(path.vendor.css)) //И в app
   // });

   gulp.task('html:build', function () {
	   return gulp.src(path.app.html) //Выберем файлы по нужному пути
		   .pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку build
		   .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
   });

   gulp.task('modules:build', function () {
	   return gulp.src(path.app.modules) //Выберем файлы по нужному пути
		   .pipe(gulp.dest(path.dist.modules)) //Выплюнем их в папку build
		   .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
   });

   gulp.task('js:build', function () {
	   return gulp.src(['app/libs/jquery/dist/jquery.min.js',
						'app/modules/slick/slick.min.js',
		   path.app.js]) //Найдем наш main файл
		   .pipe(concat('scripts.min.js'))
		   .pipe(sourcemaps.init()) //Инициализируем sourcemap
		   .pipe(uglify()) //Сожмем наш js
		   .pipe(sourcemaps.write()) //Пропишем карты
		   .pipe(gulp.dest(path.dist.js)) //Выплюнем готовый файл в build
		   .pipe(reload({stream: true})); //И перезагрузим сервер
   });

   gulp.task('scss:build', function () {
	   return gulp.src(path.app.scss) //Выберем наш main.scss
		   .pipe(sourcemaps.init()) //То же самое что и с js
		   .pipe(sass()) //Скомпилируем
		   .pipe(autoprefixer({
			   browsers: ['> 0.1%'],
			   cascade: false
		   }))				//Добавим вендорные префиксы
		   .pipe(cleanCSS({
			   level: 2
			 }))	 //Сожмем
		   .pipe(sourcemaps.write())
		   .pipe(gulp.dest(path.dist.scss)) //И в build
		   .pipe(reload({stream: true}));
   });

   gulp.task('css:build', function () {
	   return gulp.src(path.app.css) //Выберем наш main.css 'app/css/*.css'
		   .pipe(sourcemaps.init()) //То же самое что и с js
		   .pipe(autoprefixer({
			   browsers: ['> 0.1%'],
			   cascade: false
		   }))				//Добавим вендорные префиксы
		   .pipe(cleanCSS({
			   level: 2
			 }))	 //Сожмем
		   .pipe(gulp.dest(path.dist.css)) //И в build
		   .pipe(reload({stream: true})); 
   });

   gulp.task('image:build', function () {
	   return gulp.src(path.app.img) //Выберем наши картинки
		   .pipe(imagemin({ //Сожмем их
			   progressive: true,
			   svgoPlugins: [{removeViewBox: false}],
			   use: [pngquant()],
			   interlaced: true
		   }))
		   .pipe(gulp.dest(path.dist.img)) //И бросим в build
		   .pipe(reload({stream: true}));
   });

   gulp.task('fonts:build', function() {
	   return gulp.src(path.app.fonts)
		   .pipe(gulp.dest(path.dist.fonts))
   });

   
   gulp.task('build', gulp.series( 
	   //'vendorCss:build', 'vendorJs:build', 
	   'html:build', 'modules:build', 'js:build', 'scss:build', 'css:build', 
	   'fonts:build', 'image:build'
   ));



   gulp.task('watch', function(){
			   gulp.watch([path.watch.html], gulp.parallel('html:build'));
			   gulp.watch([path.watch.scss], gulp.parallel('scss:build'));
			   gulp.watch([path.watch.js], gulp.parallel('js:build'));
			   gulp.watch([path.watch.img], gulp.parallel('image:build'));
			   gulp.watch([path.watch.fonts], gulp.parallel('fonts:build'));
			   gulp.watch([path.watch.modules], gulp.parallel('modules:build'))
   });
   


gulp.task('webserver', function () {
   browserSync(config);
});

gulp.task('clean', function (cb) {
   rimraf(path.clean, cb);
   });


gulp.task('dev', gulp.series('clean','build', gulp.parallel('watch', 'webserver')));









