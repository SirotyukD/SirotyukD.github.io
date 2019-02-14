$(function() {

	// Custom JS

		//Якоря
		///ID блока с ссылками #prime_nav
	$(".header-menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
 
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
 
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});


	//slider

	$('.slick-slider').slick({
		dots: true		
		});

		//tabs

		$(".tab-content").not(":first").hide();
		$(".tab").click(function() {
			$(".tab").removeClass("tab-content__active").eq($(this).index()).addClass("tab-content__active");
			$(".tab-content").hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass("tab-content__active");


	$(".tab-item:first").addClass("tab-item-active");
	$(".tab-item").click(function() {
		$(".tab-item").removeClass("tab-item-active").eq($(this).index()).addClass("tab-item-active")
		// $(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("tab-item-active");

	$(".tab-item1:first").addClass("tab-item-active");
	$(".tab-item1").click(function() {
		$(".tab-item1").removeClass("tab-item-active").eq($(this).index()).addClass("tab-item-active")
		// $(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("tab-item-active");




});
