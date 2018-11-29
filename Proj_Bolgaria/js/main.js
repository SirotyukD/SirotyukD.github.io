//Slider slick
$('.reviews-wrap').slick({
	dots: true
});

//E-mail Ajax Send
$("#form").submit(function() { //Change
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "php/mail.php", //Change
		data: th.serialize()
	}).done(function() {
		swal(
			'Заявка принята!',
			'Мы скоро с Вами свяжемся!',
			'success'
		  )
		setTimeout(function() {
			// Done Functions
			th.trigger("reset");
		}, 1000);
	});
	return false;
});

$("#form-modal").submit(function() { //Change
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "php/mail.php", //Change
		data: th.serialize()
	}).done(function() {
		swal(
			'Заявка принята!',
			'Мы скоро с Вами свяжемся!',
			'success'
		  );
		setTimeout(function() {
			// Done Functions
			th.trigger("reset");
		}, 1000);
	});
	return false;
});



//Якорь. Плавное перемищение
$(".header-arrow").on("click","a", function (event) {
	event.preventDefault();
	var id  = $(this).attr('href'),
		top = $(id).offset().top;
	$('body,html').animate({scrollTop: top}, 1000);
});

//Модальное окно
$('.popup-with-form').magnificPopup({
	type: 'inline',
	preloader: false,
	focus: '#name',
});
