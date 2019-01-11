
//добавленике класса при прокрутке вниз страницы
$(window).scroll(function() {
	$('.block-down').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass("fadeInUp");
			}
	})
})