<?php

//Your authentication key
$authKey = "65373Aur7ub23VBi533913dd";

//Multiple mobiles numbers seperated by comma
if(!empty($_POST['number'])){
	$mobileNumber = $_POST['number'];
}
echo $mobileNumber;
//Sender ID,While using route4 sender id should be 6 characters long.
$senderId = "DINEIN";

//Your message to send, Add URL endcoding here.
$message = urlencode("Your table is ready. Please come by as soon as possible");

//Define route 
$route = "4";
//Prepare you post parameters
$postData = array(
    'authkey' => $authKey,
    'mobiles' => $mobileNumber,
    'message' => $message,
    'sender' => $senderId,
    'route' => $route
);

//API URL
$url="https://control.msg91.com/sendhttp.php";

// init the resource
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData
    //,CURLOPT_FOLLOWLOCATION => true
));

//get response
//$output = curl_exec($ch);

//curl_close($ch);

//echo $output;
?>