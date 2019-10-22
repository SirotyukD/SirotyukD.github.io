$(function () {

	// Custom JS

	//плавные якоря
	$("#menu, #nav").on("click", "a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id = $(this).attr('href'),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({
			scrollTop: top
		}, 1000);
	});

	//m-menu
	$('.m-menu').on('click', function (e) {
		e.preventDefault();
		$('.m-menu-box').toggleClass('show');
	});

	//slick
	$('.header_slider').slick({
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		//autoplay: true,
		autoplaySpeed: 2000,
	});

	$('.box-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows: '.box-arrows',
		autoplay: true,
		autoplaySpeed: 1500,
	});

	//wow анимация при скроле 
	var wow = new WOW({
		boxClass: 'wow', // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset: 120, // distance to the element when triggering the animation (default is 0)
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



	
