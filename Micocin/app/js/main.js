$(function () {

	// Custom JS

	//плавные якоря для перехода по всем страницам
	$('a[href*="#"]').on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
		return false;
	});


	//m-menu
	$('.m-menu').on('click', function (e) {
		e.preventDefault();
		$('.m-menu-box').toggleClass('show');
	});


	//модальное окно
	var elements = $('.modal-overlay, .modal');

	$('.modal-btn').click(function () {
		elements.addClass('active');
	});

	$('.close-modal').click(function () {
		elements.removeClass('active');
	});


	//анимация кнопки
	$(".ripple").on("click", function (event) {
		$(this).append("<span class='ripple-effect'>");
		$(this).find(".ripple-effect").css({
			left: event.pageX - $(this).position().left,
			top: event.pageY - $(this).position().top
		}).animate({
			opacity: 0,
		}, 1500, function () {
			$(this).remove();
		});
	});


	//scrollBar
	$('.scrollbar-macosx').scrollbar();

});