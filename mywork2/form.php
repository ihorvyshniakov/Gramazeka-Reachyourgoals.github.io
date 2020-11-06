<?php
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	// letter will be understandable
	$mail->CharSet = 'UTF-8';
	// errors will shows in russian
	$mail->setLanguage('ru', 'phpmailer/language/');
	// let add html tags into mail
	$mail->IsHTML(true);

	// Sender - From whom the email
	$mail->setFrom('vladron28051996@gmail.com', 'Email from customer');
	// Receiver - To whom send
	$mail->addAddress('gramazekavip@gmail.com');
	//Letter subject
	$mail->Subject = "New order";

	//The letter
	$body = "<h1>You've got a new message from customer. </h1>";
	
	// if field isn't empty add tag <p> with value of field
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['age']))){
		$body.='<p><strong>Age:</strong> '.$_POST['age'].'</p>';
	}
	if(trim(!empty($_POST['radios']))){
		$body.='<p><strong>Will recommend us?:</strong> '.$_POST['radios'].'</p>';
	}
	if(trim(!empty($_POST['time']))){
		$body.='<p><strong>Duration of order:</strong> '.$_POST['time'].'</p>';
	}
	
	if(!empty($_POST['like_list'])) {
		foreach($_POST['like_list'] as $check) {
			$result.=$check.", ";
		}
		$result = substr($result,0,-2);
		$body.='<p><strong>What likes:</strong> '.$result.'</p>';
	}

	if(trim(!empty($_POST['comment']))){
		$body.='<p><strong>Message:</strong> '.$_POST['comment'].'</p>';
	}

	$mail->Body = $body;

	//Sending
	if (!$mail->send()) {
		$message = 'Error';
	} else {
		$message = 'Data is sent!';
	}

	// create .json with 'error' or 'Data is sent!'
	$response = ['message' => $message];

	// return to script.js
	header('Content-type: application/json');
	echo json_encode($response);
?>