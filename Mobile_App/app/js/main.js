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
	$('.slider').slick({
		//infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: '65px',
		centerMode: true,
		dots: true,
		arrows: false,
		responsive: [{
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
		elements.addClass('active');
	});
	$('.close-modal').click(function () {
		elements.removeClass('active');
	});

	//wow анимация при скроле 
	var wow = new WOW({
		boxClass: 'wow', // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset: 150, // distance to the element when triggering the animation (default is 0)
		mobile: false, // trigger animations on mobile devices (default is true)
		live: true, // act on asynchronously loaded content (default is true)
		callback: function (box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null, // optional scroll container selector, otherwise use window,
		resetAnimation: true, // reset animation on end (default is true)
	});
	wow.init();

});