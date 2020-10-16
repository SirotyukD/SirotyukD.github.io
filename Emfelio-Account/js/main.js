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

	initRlModals(jQuery);
});


function initRlModals($) {
	$('body').on('click', '.rl-modal__close', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.returnValue = false;
		var $modal = $(this).closest('.rl-modal');
		var id = $modal.attr('id') || $modal[0].getAttribute('data-rl-modal');
		rlModalClose(id);
		return false;
	}).on('click', 'a.rl-modal-handle', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.returnValue = false;
		rlModalOpen($(this).attr('href').substr(1));
		return false;
	}).on('click', '[data-rl-modal-handle]', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		e.returnValue = false;
		rlModalOpen(this.getAttribute('data-rl-modal-handle'));
		return false;
	}).on('click', '.rl-modal:not(.rl-modal--disable-outer-closing)', function (e) {
		if ($('body').hasClass('opened-rl-modal') && ($(e.target).is('.rl-modal__close') || !$(e.target).closest('.rl-modal__wrap').length)) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			e.returnValue = false;

			var $modal = $(e.target).closest('.rl-modal');
			var id = $modal.attr('id') || $modal[0].getAttribute('data-rl-modal');
			rlModalClose(id);

			return false;
		}
	});
}

function rlModalGet(id) {
	var $modal = jQuery('#' + id);
	if (!$modal.length)
		$modal = jQuery('[data-rl-modal="' + id + '"]');
	return $modal;
}

function rlModalOpen(id) {
	var $modal = rlModalGet(id);
	if (!$modal.length) return false;
	$modal.addClass('showed');
	jQuery('body').addClass('opened-rl-modal');
}

function rlModalClose(id) {
	var $modal = rlModalGet(id);
	if (!$modal.length) return false;
	$modal.removeClass('showed');
	if (!jQuery('.rl-modal.showed').length)
		jQuery('body').removeClass('opened-rl-modal');
}

function rlModalCloseAll() {
	jQuery('.rl-modal.showed').removeClass('showed');
	jQuery('body').removeClass('opened-rl-modal');
}
