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




});
