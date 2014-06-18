<?php
include_once 'db_connect.php';
include_once 'functions.php';
//echo "ok1"; 
sec_session_start(); // Our custom secure way of starting a PHP session.
//echo "ok2"; 
if (isset($_POST['email'], $_POST['p'])) {
	//echo "ok3"; 
	//echo $_POST['email'];
	//echo $_POST['p'];

    $email = $_POST['email'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($email, $password, $mysqli) == true) {
        echo "Login success"; 
        header('Location: index.php');
    } else {
        echo "<center><p>Login failed</center></p>"; 
        //header('Location: index.php?error=1');
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo '<center><p>Invalid Request</center></p>';
}
