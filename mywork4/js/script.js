$(document).ready(function () {
	
	$('.menu__btn, #menu__box').click(function () {
	
		$('.menu__btn, #menu__box').toggleClass('active');
		$('body').toggleClass('lock');

	});
	
});