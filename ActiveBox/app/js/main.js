$(function() {

	// Custom JS

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
