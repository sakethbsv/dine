<?php
include_once 'db_connect.php';
include_once 'functions.php';
echo "ok1"; 
sec_session_start(); // Our custom secure way of starting a PHP session.
echo "ok2"; 
if (isset($_POST['email'], $_POST['p'])) {
	echo "ok3"; 

    $email = $_POST['email'];
    $password = $_POST['p']; // The hashed password.
 
    if (login($email, $password, $mysqli) == true) {
        // Login success 
        header('Location: protected_page.php');
    } else {
        // Login failed 
        header('Location: index.php?error=1');
    }
} else {
    // The correct POST variables were not sent to this page. 
    echo 'Invalid Request';
}