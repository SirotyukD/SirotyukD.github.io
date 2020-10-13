$(document).ready(function () {

	var sbw = window.innerWidth - document.documentElement.clientWidth;
	document.documentElement.style.setProperty('--scrollbar-width', sbw + 'px');

	//функционал выезжания бокового меню
	jQuery('.burger').click(function (event) {

		if (jQuery(this).hasClass('active')) {
			jQuery('.burger').removeClass('active');
			jQuery('.wrapper').removeClass('smMenu');
			jQuery('.wrapper').addClass('lgMenu');
			setTimeout(function () {
				jQuery(".sidebar-left").removeClass('small');
				jQuery(".sidebar-left").addClass('big');
			}, 300);

		} else {
			jQuery('.wrapper').removeClass('lgMenu');
			jQuery('.burger').addClass('active');
			jQuery('.wrapper').addClass('smMenu');
			setTimeout(function () {
				jQuery(".sidebar-left").removeClass('big');
				jQuery(".sidebar-left").addClass('small');
			}, 250);
		}

	});


	//добавить класс active для смены цвета input[type="tel"
	jQuery('body.emfelio-account input[type="tel"]').click(function (event) {
		jQuery(this).addClass('active')
	});




	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}

	function ibg() {
		if (isIE()) {
			let ibg = document.querySelectorAll(".ibg");
			for (var i = 0; i < ibg.length; i++) {
				if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
					ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
				}
			}
		}
	}
	ibg();

});
