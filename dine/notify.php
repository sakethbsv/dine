<?php

//Your authentication key
$authKey = "65373Aur7ub23VBi533913dd";

//Multiple mobiles numbers seperated by comma
if(!empty($_POST['number'])){
	$mobileNumber = $_POST['number'];
}
$mobileNumber = '9840346380';
//Sender ID,While using route4 sender id should be 6 characters long.
$senderId = "DINEIN";

//Your message to send, Add URL endcoding here.
$message = urlencode("Your table is ready. Please come by as soon as possible. Sent using PHP");

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
$output = curl_exec($ch);

if (curl_errno($ch)) {
				echo "curl no success";

    // this would be your first hint that something went wrong
    die('Couldn\'t send request: ' . curl_error($ch));

} else {
    // check the HTTP status code of the request
    $resultStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($resultStatus == 200) {
        // everything went better than expected
		echo "curl success";
    } else {
        // the request did not complete as expected. common errors are 4xx
        // (not found, bad request, etc.) and 5xx (usually concerning
        // errors/exceptions in the remote script execution)
					echo "curl no success";

        die('Request failed: HTTP status code: ' . $resultStatus);

    }
}

curl_close($ch);

echo $output;
?>
