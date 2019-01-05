$(function() {

	// Custom JS

	//slider

	$('.slider-slick').slick({
		centerMode: true,
		centerPadding: '20px',
		slidesToShow: 1,
		responsive: [
		  {
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
		
		$(document).ready(function() {
			$("#content div").hide(); // Скрываем содержание
			$("#tabs li:first").attr("id","current"); // Активируем первую закладку
			$("#content div:first").fadeIn(); // Выводим содержание
				
				$('#tabs a').click(function(e) {
						e.preventDefault();        
						$("#content div").hide(); //Скрыть все сожержание
						$("#tabs li").attr("id",""); //Сброс ID
						$(this).parent().attr("id","current"); // Активируем закладку
						$('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
				});

				$('ul.plan-choose__tabs').addClass('active')
				$('ul.plan-choose__tabs').on('click', 'li:not(.active)', function() {
					$(this)
						.addClass('active').siblings().removeClass('active')
						//.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
				});
				
		});

		// $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
		// });

});
