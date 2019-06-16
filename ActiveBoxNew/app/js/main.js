$(function() {

	// Custom JS
	// $(document).ready(function(){
		
	//   });


	$(document).ready(function(){
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

			$('.slick-slider').slick({
				dots: true
			});

		});
		

});
