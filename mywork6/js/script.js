$(document).ready(function () {
	$('nav').click(function (event) {
		$('#burger, #img img, header').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
