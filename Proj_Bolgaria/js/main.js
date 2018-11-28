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
		alert("Спасибо за обращение! В ближайшее время ми с вами свяжемся");
		setTimeout(function() {
			// Done Functions
			th.trigger("reset");
		}, 1000);
	});
	return false;
});