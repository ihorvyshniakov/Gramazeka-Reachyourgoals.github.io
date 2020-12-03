$(document).ready(function () {

	// burger-menu
	$('#burger, .nav').click(function () {
		$('#burger, .nav').toggleClass('active');
	});

	// screen1
	gsap.to('.trax__title', {
		duration: 2,
		text: "RIZOR<br>HOVERTRAX<br><span>4.0</span>"
	});
	gsap.to('.trax__text', {
		duration: 2,
		text: "МАНЕВРЕННОСТЬ, ЛЕГКОСТЬ,<br>ЭКОЛОГИЧНОСТЬ"
	});

	gsap.from('#s1 .video', {
		scrollTrigger: {
			trigger: '#s1 .video',
			toggleActions: "restart none restart none",
			// markers: 'true',
		},
		x: 1200,
		duration: 2,
		opacity: 0
	});

	// Text jumping


	// screen2

	$(window).on('load', function () {
		if ($(window).width() < '992') {
			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: '#benefits',
					start: '+=200 70%',
					toggleActions: "restart none none reverse",
					// markers: 'true',
				}
			})
			tl2.from('#benefits .video', {
					x: -300,
					opacity: 0,
					duration: 1,
				})
				.from('#benefits .article:nth-of-type(1)', {
					y: 200,
					opacity: 0,
					duration: 1,
				}, '-=1')
				.from('#benefits .article:nth-of-type(2)', {
					y: 200,
					opacity: 0,
					duration: 1,
				}, '-=0.5')
		} else {
			let tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: '#benefits',
					start: 'top 70%',
					toggleActions: "restart none none reverse",
					// markers: 'true',
				}
			})
			tl2.from('#benefits .video', {
					x: -300,
					opacity: 0,
					duration: 1,
				})
				.from('#benefits .article:nth-of-type(1)', {
					y: 200,
					opacity: 0,
					duration: 1,
				}, '-=1')
				.from('#benefits .article:nth-of-type(2)', {
					y: -200,
					opacity: 0,
					duration: 1,
				}, '-=1')
		}
	})

	// screen3
	let tl3 = gsap.timeline({
		scrollTrigger: {
			trigger: '#properties .video',
			start: '-=100 70%',
			end: 'bottom 30%',
			toggleActions: "restart none none reverse",
			// markers: 'true',
		}
	})
	tl3.from('#properties .video', {
			x: 1200,
			opacity: 0,
			duration: 1
		})
		.from('#properties .article', {
			y: 210,
			opacity: 0,
			duration: 1
		}, '-=0.5')

	// screen4
	let tl4 = gsap.timeline({
		scrollTrigger: {
			trigger: '#forwhom',
			start: '+=100 70%',
			toggleActions: "restart none none reverse",
			// markers: 'true',
		}
	})
	tl4.from('#forwhom .video', {
			x: 1200,
			opacity: 0,
			duration: 1
		})
		.from('#forwhom .article', {
			y: 100,
			opacity: 0,
			duration: 1
		}, '-=0.5')

});
