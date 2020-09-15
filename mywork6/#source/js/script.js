$(document).ready(function () {
	parent = document.querySelectorAll('.parent');
	$('#burger, header').click(function (event) {
		$('#burger, #img img, header').toggleClass('active');
		$('body').toggleClass('lock');
	});
	// $('.item_global:eq(0)').click(function (event) {
	// 	$('h4:eq(0)').toggleClass('parent');
	// 	$('.item:eq(0)').toggleClass('active');
	// });
	// if ($('.item_global:eq(0) h4:eq(0)').hasClass('parent')) {
	// 	$('.item_global:eq(0) h4:eq(0)').removeClass('parent');
	// } else {
	// 	$('.item_global:eq(1)').click(function (event) {
	// 		$('h4:eq(1)').toggleClass('parent');
	// 		$('.item:eq(1)').toggleClass('active');
	// 	});
	// 	$('.item_global:eq(2)').click(function (event) {
	// 		$('h4:eq(2)').toggleClass('parent');
	// 		$('.item:eq(2)').toggleClass('active');
	// 	});
	// }
});