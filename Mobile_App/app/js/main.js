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
	$('.burger').on('click', function (e) {
		e.preventDefault();
		$('.burger-line').toggleClass('burger-active');
		$('.burger-list').toggleClass('burger-list-active');
	});

	

	//slick слайдер
	$('.slider').slick({
		//infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: '65px',
		centerMode: true,
		dots: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '10px',
				}
			},
			// {
			// 	breakpoint: 600,
			// 	settings: {
			// 		slidesToShow: 2,
			// 		slidesToScroll: 2
			// 	}
			// }
		
		]
	
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