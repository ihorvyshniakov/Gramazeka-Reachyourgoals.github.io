// TODO: positioning :after on slider

$(document).ready(function () {
	// ____BURGER-MENU____

	// If we click on burger-menu
	$('#burger, header').click(function (event) {
		// toggle class 'active' to show menu
		$('#burger, #img img, header').toggleClass('active');
		// toggle class 'lock' to deny scroll page when menu is shown
		$('body').toggleClass('lock');
	});

	// hide all ul except first
	$('.item_global>ul').hide();

	$('.item_global>h4').click(function () {

		// find exact h4 on which user click & take next ul(list) for next actions
		var findArticle = $(this).next('ul');

		// find wrapper for our h4, it's need if on the page exist more than 1 accordion
		var findWrapper = $(this).closest('#block2');

		// add active status to h4
		$(this).addClass('active');

		// if user click on exact elem and it shown
		if (findArticle.is(':visible')) {

			// than hide it with animation slideUp(we can use 'fast'=10 & 'slow'=600 & default(empty)=400 - miliseconds)
			findArticle.slideUp();

			// toggle active status to h4
			$(this).toggleClass('active');

		} else {

			// if elem is hide than hide all others .item-global>.item(lists) with anim slideUp 400ms
			findWrapper.find('>.item_global>.item').slideUp();
			// remove active status from all h4
			findWrapper.find('>.item_global>h4').removeClass('active');

			// and list of clicked h4 show with slideDown
			findArticle.slideDown();
			// add active status to clicked h4
			findArticle.prev('h4').addClass('active');

		};
	});

	// END____BURGER-MENU____

	// ____SLIDER____5_screen

	// move markup 4 slider(span remove)
	$('#section5>.wrapper>.photo>#scr3>span').prependTo('#section5>.wrapper');

	var width = $('#section5>.wrapper>.photo').width();

	// set height of slider
	var heightPhoto = $('#section5').height() - $('#section5>#wrapper1').height() - $('#section5>.wrapper>article').height();
	$('#section5>.wrapper>.photo').height('calc(' + heightPhoto + 'px - 2vh)');

	// move markup( controls moving)
	$('.wrapper>span>#img>img').css('top', ($('#section5>.wrapper #scr3').height() * 0.40 + "px"));

	// all img has width of container
	// $('#scr3>img').width(width);
	$('#scr3>img').css('max-width', width);

	// block .slides width=container*quontity of images
	$('#scr3').width(width * $('#scr3>img').length);

	// Positioning
	// move left block .slides, so images have space where to slide
	$('#scr3').css('left', -width + (width - $('#scr3>img:first-child').width()) / 2);

	// add margin to all img adaptive img on whole height
	$('#scr3>img').css('margin', '0 ' + (width - $('#scr3>img:first-child').width()) + 'px');

	// last img become first(user can slide forever)
	$('#scr3>img:last-child').prependTo('#scr3');

	// move slides forward
	function nextSlide() {
		$('#scr3').animate({
			'margin-left': -width
		}, 500, function () {
			$('#scr3>img:first-child').appendTo('#scr3');
			$('#scr3').css('margin-left', 0);
		});
	}
	// move slides backward
	function prevSlide() {
		$('#scr3').animate({
			'margin-left': width
		}, 500, function () {
			$('#scr3>img:last-child').prependTo('#scr3');
			$('#scr3').css('margin-left', 0);
		});
	}

	// Controls
	$('.next').click(nextSlide);
	$('.prev').click(prevSlide);

	// END____SLIDER____5_screen
});
