$(document).ready(function(){
	02
		$("#menu").on("click","a", function (event) {
	03
			//отменяем стандартную обработку нажатия по ссылке
	04
			event.preventDefault();
			//забираем идентификатор бока с атрибута href
	07
			var id  = $(this).attr('href'),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(id).offset().top;
			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 500);
	14
		});
	15
	});