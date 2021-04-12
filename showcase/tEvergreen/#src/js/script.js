// when the page's loaded
$(window).on('load', () => {
	// init owl-carousel
	$('.owl-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplaySpeed: 1000,
		items: 1
	})

	// Calculator
	$('form').on('change input', () => {
		let calc = 0;
		let val1 = Number($('#val1').val());
		let val2 = Number($('#val2').val());
		let val3 = Number($('#val3').val());
		let val4 = Number($('#culture').val());

		// error state trigger UI
		function checkErrorTrigerUI() {
			if (val1 <= 0) {
				$('#val1').addClass('error')
			} else {
				$('#val1').removeClass('error')
			}
			if (val2 <= 0) {
				$('#val2').addClass('error')
			} else {
				$('#val2').removeClass('error')
			}
			if (val3 <= 0) {
				$('#val3').addClass('error')
			} else {
				$('#val3').removeClass('error')
			}
		}

		checkErrorTrigerUI();

		// if values everywhere -> show result
		if (val1 > 0 && val2 > 0 & val3 > 0 & val4 > 0) {
			calc = ((val4 / val1) + val3 + val2) * 10;
			$('#resultInfo').text(Math.round(calc))
		}
	})
})