$(function () {

	// Custom JS

	//плавные якоря для перехода внутри сайта
	// $("#menu, #nav").on("click", "a", function (event) {
	// 	//отменяем стандартную обработку нажатия по ссылке
	// 	event.preventDefault();
	// 	//забираем идентификатор бока с атрибута href
	// 	var id = $(this).attr('href'),
	// 		//узнаем высоту от начала страницы до блока на который ссылается якорь
	// 		top = $(id).offset().top;
	// 	//анимируем переход на расстояние - top за 1500 мс

	// 	$('body,html').animate({
	// 		scrollTop: top
	// 	}, 1000);
	// });

	//плавные якоря для перехода по всем страницам
	$('a[href*="#"]').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
		return false;
	});


	//m-menu
	$('.m-menu').on('click', function (e) {
		e.preventDefault();
		$('.m-menu-box').toggleClass('show');
	});

	//slick слайдер
	$('.slider-places').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0px',
		prevArrow: '<img class="slider-arrow" src="../img/slider-arrow.png" alt="slick-arrow">',
		nextArrow: '<img class="slider-arrow" src="../img/slider-arrow.png" alt="slick-arrow">',

		// responsive: [
		// 	{
		// 	  breakpoint: 993,
		// 	  settings: {
		// 		slidesToShow: 2,
		// 		slidesToScroll: 1,
		// 	  }
		// 	},
		// 	 {
		// 		breakpoint: 768,
		// 		settings: {
		// 		  slidesToShow: 1,
		// 		  arrows: false,
		// 		  slidesToScroll: 1,
		// 		}
		// 	 }
			
		//   ]
	});

	//слайдер секции video
	$('.slider-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-sidebar',
		//autoplay: true,
		autoplaySpeed: 3000,
	});
	$('.slider-sidebar').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-main',
		dots: false,
		centerMode: false,
		infinite: true,
		focusOnSelect: true,
		vertical: true,
		arrows: false
	});



	//модальное окно
	var elements = $('.modal-overlay, .modal');

	$('.modal-btn').click(function () {
		elements.addClass('active-modal');
	});

	$('.close-modal').click(function () {
		elements.removeClass('active-modal');
	});

});