<?php
include_once 'psl-config.php';   // As functions.php is not included
try {
    $mysqli = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
    $mysqli->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}
catch(Exception $e){
    die(var_dump($e));
	echo("Failure, Could not connect to database. Contact Dine services.");
}