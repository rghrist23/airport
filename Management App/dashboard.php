<?php

//starting curl service
$ch = curl_init();

//getting login var from index.php
$email = $_POST['username'];
$password = $_POST['password'];

//contacting server
curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/user_login/" . $email . "/" . $password);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);


//executing server
$output = curl_exec($ch);

//closing server
curl_close($ch);

$output = json_decode($output);


?>


<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<!-- dashboard welcome page -->
<body>
<?php print_r($output) ?>
</body>
</html>