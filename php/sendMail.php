<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$to = "Jansen.Jeroen@hotmail.com";
$subject = "[CONTACT WEBSITE] " . $_POST['subject'];
$message = $_POST['message'];
$headers = "From: " . $_POST['from'];

$mailSent = mail($to, $subject, $message, $headers);

if (!$mailSent) {
  die('Mail kon niet verzonden worden');
}

?>
