$(document).ready(function () {

	var sbw = window.innerWidth - document.documentElement.clientWidth;
	document.documentElement.style.setProperty('--scrollbar-width', sbw + 'px');

	// var wrapper = document.querySelector(".wrapper");
	// var burger = document.querySelector(".burger");
	// var sidebar = document.querySelector(".sidebar-left");
	// if (burger) {
	// 	burger.addEventListener("click", function () {
	// 		wrapper.classList.toggle("active");
	// 		sidebar.classList.toggle("small");
	// 	});
	// }



	// jQuery('.burger').click(function (event) {
	// 	// event.preventDefault();

	// 	if (jQuery('.wrapper').hasClass('active')) {
	// 		jQuery('.wrapper').removeClass('active');
	// 		jQuery(".sidebar-left").addClass('big');
	// 		setTimeout(function () {
	// 			jQuery(".sidebar-left").removeClass('small');
	// 		}, 300);
	// 	} else {
	// 		jQuery(".sidebar-left").removeClass('big');
	// 		jQuery('.wrapper').addClass('active');
	// 		setTimeout(function () {
	// 			jQuery(".sidebar-left").addClass('small');
	// 		}, 300);
	// 	}
	// });

	jQuery('.burger').click(function (event) {
		// event.preventDefault();

		if (jQuery(this).hasClass('active')) {
			jQuery('.burger').removeClass('active');
			jQuery('.wrapper').removeClass('smMenu');
			jQuery('.wrapper').addClass('lgMenu');
			setTimeout(function () {
				jQuery(".sidebar-left").removeClass('small');
				jQuery(".sidebar-left").addClass('big');
			}, 450);


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
