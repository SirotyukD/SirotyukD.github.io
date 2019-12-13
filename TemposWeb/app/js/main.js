$(function () {

	// Custom JS

	//плавные якоря для перехода по всем страницам
	$('a[href*="#"]').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
		return false;
	});

	//віпадающий список контактов в Header
	$('.header-contact__btn').on('click', function (e) {
		e.preventDefault();
		$('.header-contact__list').toggleClass('header-contact__list--active');
	});


	//m-menu
	$('.burger').on('click', function (e) {
		e.preventDefault();
		$('.m-menu, .burger, .burger--close').toggleClass('active');
		$('body').toggleClass('lock');
	});

	$('.m-menu__link').on('click', function (e) {
		e.preventDefault();
		$('.m-menu, .burger').removeClass('active');
		$('body').removeClass('lock');
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


});