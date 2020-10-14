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

	// END____BURGER-MENU____

	var counter1 = false;
	var counter2 = false;
	var counter3 = false;
	var counter4 = false;

	// Checking size of viewport and changes if need
	$(window).on('load resize', function () {
		if ($(window).width() <= '599' || $(window).width() <= '820' &&
			$(window).width() > $(window).height()) {

			// ____1_screen____

			if ($(window).width() < $(window).height()) {
				$('#section1>#scr1').height($('#section1').height() - $('#section1>h1').outerHeight(true) - $('#section1>form').height());
			}

			// ____2_screen____

			if ($(window).width() < $(window).height()) {
				$('#section2>.scr2').height($('#section2').height() - $('#section2>h2').outerHeight(true) - $('#section2>article').height());
			}

			// ____3_screen____

			// prepare markup 4 slider
			if ($('#slider-wrapper').length) {} else {
				$('#section3').append('<div id="slider-wrapper"></div>');
				$('#section3>#slider-wrapper').append('<div class="slider-cards"></div>');
				$('#section3>#cards').appendTo('.slider-cards');
				$('.slider-cards').append('<span><div id="img1"></div></span>');
				$('#img1').append('<img class="prev1" src="img/previous.png" alt=""><img class="next1" src="img/next.png" alt="">');

				$('#cards>img').remove();
			};

			// ____SLIDER____3_screen

			var width1 = $('.slider-cards').width();

			// set height of slider
			if ($(window).height() <= '567' || $(window).width() <= '820' &&
				$(window).width() > $(window).height()) {
				$('#slider-wrapper').height($('#section3').height() - $('#section3>.text').outerHeight(true) + 'px');
			} else {
				$('#slider-wrapper').height('auto');
			}

			// all img has max-width of container
			$('#cards>.card>a>img').css('max-width', width1);

			// block .slides width=container*quontity of images
			$('#cards').width(width1 * $('#cards>.card').length);

			// Positioning

			if ($('#cards[left]')) {
				// move left block .slides, so images have space where to slide
				$('#cards').css('left', -width1 + (width1 - $('#cards>.card:first-of-type').width()) / 2);
			}

			// add margin to all img adaptive img on whole height
			$('#cards>.card').css('margin', '0 ' + (width1 - $('#cards>.card:first-child').width()) + 'px');

			// do only once
			if (!counter1) {
				// last img become first(user can slide forever)
				$('#cards>.card:last-of-type').prependTo('#cards');

				if ($(window).width() < $(window).height()) {
					// move slides forward
					function nextSlide1() {
						$('#cards').animate({
							'margin-left': -width1
						}, 500, function () {
							$('#cards').css('margin-left', 0);
							$('#cards>.card:first-child').appendTo('#cards');
						});
					}
					// move slides backward
					function prevSlide1() {
						$('#cards').animate({
							'margin-left': width1
						}, 500, function () {
							$('#cards').css('margin-left', 0);
							$('#cards>.card:last-child').prependTo('#cards');
						});
					}
				} else {
					// move slides forward
					function nextSlide2() {
						$('#cards').animate({
							'margin-left': -width1
						}, 500, function () {
							$('#cards').css('margin-left', 0);
							$('#cards>.card:first-child').appendTo('#cards');
						});
					}
					// move slides backward
					function prevSlide2() {
						$('#cards').animate({
							'margin-left': width1
						}, 500, function () {
							$('#cards').css('margin-left', 0);
							$('#cards>.card:last-child').prependTo('#cards');
						});
					}
				}

				counter1 = true;
			}

			if ($(window).width() < $(window).height()) {
				// Controls
				$('.next1').click(nextSlide1);
				$('.prev1').click(prevSlide1);
			} else {
				$('.next1').click(nextSlide2);
				$('.prev1').click(prevSlide2);
			}

			// END____SLIDER____3_screen

			// ____4_screen____

			if ($(window).width() < $(window).height()) {
				$('#section4>.scr2').height($('#section4').height() - $('#section4>h2').outerHeight(true) - $('#section4>article').height());
			}

			// ____SLIDER____5_screen

			// move markup 4 slider(span remove)
			$('#section5>.wrapper>.photo>#scr3>span').prependTo('#section5>.wrapper');

			var width = $('#section5>.wrapper>.photo').width();

			// set height of slider
			if ($(window).height() <= '567' && $(window).width() < $(window).height()) {
				var heightPhoto = $('#section5').height() - $('#section5>#wrapper1').height() - $('#section5>.wrapper>article').height();
				$('#section5>.wrapper>.photo').height('calc(' + heightPhoto + 'px - 2vh)');
			} else if ($(window).width() <= '820' &&
				$(window).width() > $(window).height()) {
				$('#section5>.wrapper>.photo').height($('#section5>.wrapper').height());
			} else {
				$('#section5>.wrapper>.photo').height('auto');
			}

			// all img has max-width of container
			$('#scr3>img').css('max-width', width);

			// block .slides width=container*quontity of images
			$('#scr3').width(width * $('#scr3>img').length);

			// Positioning
			if ($(window).width() < $(window).height()) {

				// add margin to all img adaptive img on whole height
				$('#scr3>img').css('margin', '0 ');
				$('#scr3>img').css('margin', '0 ' + (width - $('#scr3>img:first-child').width()) + 'px');

				// move left block .slides, so images have space where to slide
				$('#scr3').css('left', -width + (width - $('#scr3>img:first-child').width()) / 2);

				// if ($(window).height() <= '567') {
				// $('#scr3>img').css('margin', '0 ' + (width - $('#scr3>img:first-child').width()) + 'px');
				// }
			} else {
				// move left block .slides, so images have space where to slide
				$('#scr3').css('left', -width + (width - $('#scr3>img:first-child').width()) / 2);
				// add margin to all img adaptive img on whole height
				$('#scr3>img').css('margin', '0 ' + (width - $('#scr3>img:first-child').width()) + 'px');
			}

			// move markup( controls moving)
			$('.wrapper>span>#img>img').css('top', ($('#section5>.wrapper #scr3').height() * 0.40 + "px"));

			// do only once
			if (!counter2) {
				// last img become first(user can slide forever)
				$('#scr3>img:last-child').prependTo('#scr3');

				// move slides forward
				function nextSlide() {
					$('#scr3').animate({
						'margin-left': -width
					}, 500, function () {
						$('#scr3').css('margin-left', 0);
						$('#scr3>img:first-child').appendTo('#scr3');
					});
				}
				// move slides backward
				function prevSlide() {
					$('#scr3').animate({
						'margin-left': width
					}, 500, function () {
						$('#scr3').css('margin-left', 0);
						$('#scr3>img:last-child').prependTo('#scr3');
					});
				}

				counter2 = true;
			}

			// Controls
			$('.next').click(nextSlide);
			$('.prev').click(prevSlide);

			// END____SLIDER____5_screen

			// ____6_screen____

			// add tab-menu blocks to DOM
			if ($('.tab-menu').length) {} else {
				$('#section6>.text').after($('<ul class="tab-menu"><li class="active">1<li>2<li>3<li>4</ul>'));
			}

			// do all it once
			if (!counter3) {
				// hide all posts except first
				$('#posts>div:not(":first-of-type")').hide();
				// add to all tabs item with decorative line
				$('<div class="line"></div>').appendTo('.tab-menu li');
				// find .line element and give him width 100%
				$('.tab-menu li:first-of-type').find(':first').width('100%');

				// add attributes with count number 4 every tab
				$('.tab-menu li').each(function (i) {
					$(this).attr('data-tab', 'tab' + i);
				});

				// add attributes with count number 4 every post
				$('#posts>div').each(function (i) {
					$(this).attr('data-tab', 'tab' + i);
				});


				// if click on some tab code do this
				$('.tab-menu li').on('click', function () {

					// var with number of tab on which user click
					var dataTab = $(this).data('tab');
					// take closest to clicked tab, element wrapper(#section6)  
					var getWrapper = $(this).closest('#section6');
					// find div class="line" of clicked tab
					var line = $(this).find('.line');

					// remove class from all tabs
					getWrapper.find('.tab-menu li').removeClass('active');

					// add class active to clicked tab
					$(this).addClass('active');

					// hide all div.line if click
					// getWrapper.find('.line').width(0);
					all = getWrapper.find('.line');
					$.each(all, function () {
						$(this).width(0);
					})
					// animate line of active tab 
					line.animate({
						'width': '100%'
					}, 200);

					// hide all content if click
					getWrapper.find('#posts>div').hide();
					// show post with attr data-tab that equals those tab on which clicked
					getWrapper.find('#posts>div[data-tab=' + dataTab + ']').show();

				});

				counter3 = true;
			}


			// ____FOOTER____

			if ($(window).width() < '600') {
				// hide all ul except first
				$('.item_global>ul').hide();

				if (!counter4) {
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

					counter4 = true;
				}

			} else {
				$('.item_global>ul').show();
			}

			// END____FOOTER____

		} else {
			$('#section1>#scr1').height('');
		}
	});

});
