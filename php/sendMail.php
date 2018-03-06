<?php

$to      = 'jansen.jeroen@hotmail.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$mailSent = mail($to, $subject, $message, $headers);

if (!$mailSent) {
  die('Mail kon niet verzonden worden');
}

?>
