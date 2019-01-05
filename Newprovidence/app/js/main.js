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



//1
		
		// $(document).ready(function() {
		// 	$("#content div").hide(); // Скрываем содержание
		// 	$("#tabs li:first").attr("id","current"); // Активируем первую закладку
		// 	$("#content div:first").fadeIn(); // Выводим содержание
				
		// 		$('#tabs a').click(function(e) {
		// 				e.preventDefault();        
		// 				$("#content div").hide(); //Скрыть все сожержание
		// 				$("#tabs li").attr("id",""); //Сброс ID
		// 				$(this).parent().attr("id","current"); // Активируем закладку
		// 				$('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
		// 		});

		// 		$('.plan-choose__tab').addClass('active')
		// 		$('.plan-choose__tab').on('click', 'li:not(.active)', function() {
		// 			$(this)
		// 				.addClass('active').siblings().removeClass('active')
		// 				//.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
		// 		});
				
		//});

		//2

		// $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
		// });

});
