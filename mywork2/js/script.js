document.addEventListener('DOMContentLoaded', function () {

	const form = document.getElementById('survey-form');

	// after submit form run function - formSend
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		// deny to default sending of form
		e.preventDefault();

		// validation
		let error = formValidate(form);
		// get data from all form fields
		let formData = new FormData(form);

		if (error === 0) {
			// add message
			document.getElementById('message').innerHTML = "<div><div></div><p>Dear " + formName.value + ", your message is successfully sent!<br>Our shop very soon call you =)</p></div>";

			// send email to post

			// while sending data info to email add loading gif
			form.classList.add('_sending');

			// wait to send all form values(formData) to file sendmail.php
			let response = await fetch('form.php', {
				method: 'POST',
				body: formData
			});

			// sendmail.php return some .json response
			if (response.ok) {
				let result = await response.json();
				// shows this response to user
				// alert(result.message);
				form.reset();
				// hiding loading
				form.classList.remove('_sending');
				// clear error state of require fields
				// formRemoveError(input);

				// MESSAGE
				document.getElementById('message').id = 'message_active';
				document.querySelector('#message_active>div>div').addEventListener('click', function () {
					document.getElementById('message_active').id = 'message';
				})
			} else {
				form.classList.add('_sending');
				document.getElementById('message').innerHTML = '';
				document.getElementById('message').innerHTML = "<img src='img/warning.png' alt='error'><br><h1>Error!</h1>";
				// alert("Error");
				setTimeout(function () {
					form.classList.remove('_sending');

					document.getElementById('message').id = 'message_error';

					document.getElementById('message_error').addEventListener('click', function () {
						document.getElementById('message_error').id = 'message';
					})
				}, 2000);
			}
		} else {
			alert('Fill in required fields!');
		}

	}

	function formValidate(form) {
		let error = 0;
		// get all <input> with class="_req" - required fields
		let formReq = document.querySelectorAll('._req');

		// checking
		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			// before start smth checking remove class="_error"
			formRemoveError(input);

			// checkin for input with class="_email"
			if (input.classList.contains('_email')) {
				// if check crash
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
				// if it's checkbox and it's not checked
			} else {
				// if string is empty -> error
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	// test of email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});