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

	//m-menu
	$('.burger').on('click', function (e) {
		e.preventDefault();
		$('.burger-line').toggleClass('burger-active');
		$('.burger-list').toggleClass('burger-list-active');
	});

	//slick слайдер
	$('.pets-wrap-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 993,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			  }
			},
			 {
				breakpoint: 768,
				settings: {
				  slidesToShow: 1,
				  arrows: false,
				  slidesToScroll: 1,
				}
			 }
			
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