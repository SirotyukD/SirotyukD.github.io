$(function() {

	// Custom JS

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

});
