	window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	window.isBot = /bot|googlebot|crawler|spider|robot|crawling|chrome-lighthouse|Lighthouse|Speed Insights|Pingdom/i.test(window.navigator.userAgent);

	//Detect Browser
	window.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
	window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
	window.isChromeiOS = navigator.userAgent.match('CriOS');
	window.isMSIE = navigator.userAgent.match('MSIE');
	window.isEdge = navigator.userAgent.match('Edge');
	window.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	window.isiPad = navigator.userAgent.match(/iPad/i) !== null;

	//Detect OS
	window.isWindows = navigator.platform.toUpperCase().indexOf('WIN') !== -1;
	window.isOSX = navigator.platform.toUpperCase().indexOf('MAC') !== -1;
	window.isLinux = navigator.platform.toUpperCase().indexOf('LINUX') !== -1;

	//iOS13+ Devices with "Request Desktop Website" setting
	if (window.isOSX && navigator.maxTouchPoints) window.isMobile = true;
	//Retina
	window.isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));

	(function ($) {

		addDocumentInitialClasses(jQuery)
		scrollbarWidth();
		openBurgerMenu();
		showSideBarRight()
		initRlModals(jQuery);
		isIE();
		bodyAddIsIE();
		ibg();
		inputTelValueStyling();
		checkLastDataRow();

	})(jQuery);

	function addDocumentInitialClasses($) {
		var $html = $('html');

		//Prepare for CSS Fixes
		if (window.isSafari) {
			$html.addClass('safari');
		}
		if (window.isFirefox) {
			$html.addClass('firefox');
		}
		if (window.isChrome) {
			$html.addClass('chrome');
		}
		if (window.isMSIE) {
			$html.addClass('msie');
		}
		if (window.isEdge) {
			$html.addClass('edge');
		}
		if (window.isAndroid) {
			$html.addClass('android');
		}
		if (window.isWindows) {
			$html.addClass('windows');
		}
		if (window.isOSX) {
			$html.addClass('osx');
		}
		if (window.isLinux) {
			$html.addClass('linux');
		}

		//Detect Mobile
		if (window.isMobile) {
			$html.addClass('mobile');
		} else {
			$html.addClass('desktop');
		}

		if (window.isRetina) {
			$html.addClass('retina');
		}
	}

	function scrollbarWidth() {
		var sbw = window.innerWidth - document.documentElement.clientWidth;
		document.documentElement.style.setProperty('--scrollbar-width', sbw + 'px');
	}

	function openBurgerMenu() {
		jQuery('.burger').click(function (event) {

			if (jQuery(window).width() < 1199) {
				if (jQuery('.burger').hasClass('active')) {
					jQuery('.burger').removeClass('active');
					jQuery('.wrapper').removeClass('lgMenu');
					jQuery('.wrapper').addClass('smMenu');
					setTimeout(function () {
						jQuery(".sidebar-left").removeClass('big');
						jQuery(".sidebar-left").addClass('small');
					}, 300);

				} else {
					jQuery('.wrapper').removeClass('smMenu');
					jQuery('.burger').addClass('active');
					jQuery('.wrapper').addClass('lgMenu');
					setTimeout(function () {
						jQuery(".sidebar-left").removeClass('small');
						jQuery(".sidebar-left").addClass('big');
					}, 250);
				}
			} else {
				if (jQuery('.burger').hasClass('active')) {
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
			}
		});
	}

	function showSideBarRight() {
		jQuery('.informer-btn').click(function () {
			if (jQuery(window).width() < 1199) {
				jQuery('.sidebar-right').toggleClass('visible')
			}
		});
	}

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

	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}

	function bodyAddIsIE() {
		if (isIE()) {
			jQuery('body').addClass('ie');
		}
	}

	function ibg() {
		if (isIE()) {
			var ibg = document.querySelectorAll(".ibg");
			for (var i = 0; i < ibg.length; i++) {
				if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
					ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
				}
			}
		}
	}

	function inputTelValueStyling() {
		var inputs = document.querySelectorAll('input[type="tel"]');
		for (i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			inputs[i].onkeyup = function () {
				this.setAttribute('value', this.value);
			};
		}
	}

	function checkLastDataRow() {
		jQuery('.main .personal-data:last').addClass('last');
	}
