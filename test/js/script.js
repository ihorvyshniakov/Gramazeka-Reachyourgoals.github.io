console.log('Hi, Gulp!');

// Check browser 4 accessing webp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}

});

// Start of code

$(document).ready(function () {
	// burger-menu
	$('.header__burger, .header__nav').click(function () {
		$('.header__burger, .header__nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
	// contacts
	$('.header__phone-trigger, .header__phone-info').click(function () {
		$('.header__phone-trigger, .header__phone-info').toggleClass('active');
	});

	$(window).on('load', function () {
		if ($(window).width() >= '1200') {

			$('.footer__logo>img').replaceWith('<img src="img/logo_1920/logo_b_big.png" alt="">');

			$('.header').append($('.header__phone'));

			$('.nav-menu__link:nth-child(1), .nav-menu__link:nth-child(2)').insertAfter($('.header__logo'));
			$('.header>.nav-menu__link:nth-child(2), .header>.nav-menu__link:nth-child(3)').prop('class', 'header__link');

			$('.header__lang').insertAfter($('.header__nav'));

		} else if ($(window).width() >= '768' && $(window).height() >= '500' || $(window).width() >= '768') {

			$('.header').append($('.header__phone'));

			$('.nav-menu__link:nth-child(1), .nav-menu__link:nth-child(2)').insertAfter($('.header__logo'));
			$('.header>.nav-menu__link:nth-child(2), .header>.nav-menu__link:nth-child(3)').prop('class', 'header__link');

			$('.header__lang').insertAfter($('.header__nav'));

		} else if ($(window).width() < '768' || $(window).height() < '500') {

			$('.header__nav').append($('.header__phone'));

			$('.header__lang').prependTo($('.header__nav'));

		}
	})
});