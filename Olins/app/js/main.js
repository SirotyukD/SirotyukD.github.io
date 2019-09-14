$(function() {

	// Custom JS

	//плавные якоря
	$("#menu, #nav").on("click","a", function (event) {
	//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});

	//m-menu
		$('.m-menu').on('click',function(e){
		e.preventDefault();
		$('.m-menu-box').toggleClass('show');
	});

	//slick
	$('.header_slider').slick({
	});

	$('.box-slider').slick({
		infinite: true,
 		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows: '.box-arrows',
		
	});


});
