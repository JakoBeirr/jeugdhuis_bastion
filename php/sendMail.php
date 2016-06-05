<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$to = "Jansen.Jeroen@hotmail.com";

mail ($to, $subject, $message, "From: " . $email);
echo "Your message has been sent";

?>