<?php
include_once 'psl-config.php';   // As functions.php is not included
try {
    $conn = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	echo("success");
}
catch(Exception $e){
    die(var_dump($e));
	echo("failure, check IC");
}