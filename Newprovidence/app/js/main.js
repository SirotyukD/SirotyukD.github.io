$(function () {

	// Custom JS

	//slider
	$('.slider-slick').slick({
		centerMode: true,
		centerPadding: '20px',
		slidesToShow: 1,
		responsive: [{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '10px',
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '10px',
					slidesToShow: 1
				}
			}
		]
	});

	//tabs
	$(".tab-content").not(":first").hide();
	$(".tab").click(function () {
		$(".tab").removeClass("tab-content__active").eq($(this).index()).addClass("tab-content__active");
		$(".tab-content").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("tab-content__active");


	$(".tab-item:first").addClass("tab-item-active");
	$(".tab-item").click(function () {
		$(".tab-item").removeClass("tab-item-active").eq($(this).index()).addClass("tab-item-active")
		// $(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("tab-item-active");

	$(".tab-item1:first").addClass("tab-item-active");
	$(".tab-item1").click(function () {
		$(".tab-item1").removeClass("tab-item-active").eq($(this).index()).addClass("tab-item-active")
		// $(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("tab-item-active");


	//плавные якоря для перехода по всем страницам
	$('a[href*="#"]').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
		return false;
	});

	//модальное окно
	var elements = $('.modal-overlay, .modal');
	$('.modal-btn').click(function(){
			elements.addClass('active');
	});
	$('.close-modal').click(function(){
			elements.removeClass('active');
	});

	//wow анимация при скроле 
	var wow = new WOW(
		{
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       150,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			callback:     function(box) {
				// the callback is fired every time an animation is started
				// the argument that is passed in is the DOM node being animated
			},
			scrollContainer: null,    // optional scroll container selector, otherwise use window,
			resetAnimation: true,     // reset animation on end (default is true)
		}
	);
	wow.init();





});