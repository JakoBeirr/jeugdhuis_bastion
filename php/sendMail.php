<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

$array = json_decode(file_get_contents('php://input'), true);
$email = $array['email'];
$subject = $array['subject'];
$message = $array['message'];
$to = "Jansen.Jeroen@hotmail.com";

mail ($to, $subject, $message, "From: $email");
echo "Your message has been sent";

?>
