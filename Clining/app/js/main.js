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
		$('.m-menu, .burger').toggleClass('active');
		$('body').toggleClass('lock');
	});

	$('.m-menu__link').on('click', function (e) {
		e.preventDefault();
		$('.m-menu, .burger').removeClass('active');
		$('body').removeClass('lock');
	});

	//slick слайдер
	$('.header__slider').slick({
		infinite: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		fade: true,

		responsive: [{
			breakpoint: 993,
			settings: {
				autoplay: false,
			}
		}]
	});

	//слайдер секции services
	$('.services__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: '<i class="fas fa-chevron-right slick-next"></i>',
		prevArrow: '<i class="fas fa-chevron-left slick-prev"></i>',

		responsive: [{
				breakpoint: 993,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
		]

	});

	//слайдеры секции projects
	$('.slider-title').slick({
		slidesToShow: 5,
		slidesToScroll: 0,
		swipe: false,
		infinite: true,
		arrows: false,
		asNavFor: '.slider-projects',
		centerMode: true,
		focusOnSelect: true,

		responsive: [{
			breakpoint: 768,
			settings: {
				centerMode: false,

			}
		}]
	});

	//выделение выбраного слайда
	$('.slider-title__item').on('click', function () {
		$('.slider-title__item').removeClass('active');
		$(this).addClass('active');
	});

	$('.slider-projects').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.slider-title',
		fade: true,
		swipe: false,
	}); // конец слайдеров секции projects

	//слайдеры секции testimonials
	$('.slider-image').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		// arrows: false,
		asNavFor: '.slider-testi',
		centerMode: true,
		centerPadding: '10px',
		focusOnSelect: true,
		arrows: false,
		//swipe: true,
	});

	$('.slider-testi').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: '.slider-image',
		swipe: false,
		fade: true,
		nextArrow: '<i class="fas fa-chevron-right slick-next"></i>',
		prevArrow: '<i class="fas fa-chevron-left slick-prev"></i>',

	});

	//модальное окно
	var elements = $('.modal-overlay, .modal');
	//окно забронируй сейчас
	$('.book-tooday').click(function () {
		elements.addClass('active');
		$('.modal-content.book-tooday').addClass('active');
		$('body').addClass('lock');
	});
	$('.close-modal').click(function () {
		elements.removeClass('active');
		$('.modal-content.book-tooday').removeClass('active');
		$('body').removeClass('lock');
	});

	//окно расчитать стоимость
	$('.btn-quote').click(function () {
		elements.addClass('active');
		$('.modal-content.btn-quote').addClass('active');
		$('body').addClass('lock');
	});
	$('.close-modal').click(function () {
		elements.removeClass('active');
		$('.modal-content.btn-quote').removeClass('active');
		$('body').removeClass('lock');
	});

	//окно Сертификат
	$('.certificate-btn').click(function () {
		elements.addClass('active');
		$('.modal-content.certificate-btn').addClass('active');
		$('body').addClass('lock');
	});
	$('.close-modal').click(function () {
		elements.removeClass('active');
		$('.modal-content.certificate-btn').removeClass('active');
		$('body').removeClass('lock');
	});

	//окно Спасибо за подписку
	$('.subscribe-btn').click(function () {
		elements.addClass('active');
		$('.modal-content.subscribe-btn').addClass('active');
		$('body').addClass('lock');
	});
	$('.close-modal').click(function () {
		elements.removeClass('active');
		$('.modal-content.subscribe-btn').removeClass('active');
		$('body').removeClass('lock');
	});





	//scrollBar
	$('.scrollbar-macosx').scrollbar();

	//Отправка формы
	$(".form").submit(function () { //Change
		var th = $(this);
		var modal = $('.modal-overlay, .modal, .modal-content.thank-btn');
		var allModal = $('.modal-overlay, .modal, .modal-content.thank-btn,.modal-content.book-tooday, .modal-content.btn-quote, .modal-content.certificate-btn');

		$.ajax({
			type: "POST",
			url: "modules/mail.php", //Change
			data: th.serialize()
		}).done(function () {
			//добавляет active модальному
			// и блоку контент в модальном окне
			allModal.removeClass('active');
			modal.addClass('active');
			$('.close-modal').click(function () {
				modal.removeClass('active');
			});
		}).fail(function () {
			alert('fail');
		});
		return false;
	});



	$(".footer-main__item-form").submit(function () { //Change
		var subscribe = $('.modal-overlay, .modal, .modal-content.subscribe-btn');
		$.ajax({
			type: "POST",
			url: "modules/mail.php", //Change
			data: th.serialize()
		}).done(function () {
			//добавляет active модальному
			// и блоку контент в модальном окне
			allModal.removeClass('active');
			subscribe.addClass('active');
			$('.close-modal').click(function () {
				subscribe.removeClass('active');
			});
		}).fail(function () {
			alert('fail');
		});
		return false;
	});



});