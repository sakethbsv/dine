<?php
$host = "tcp:d6wfefgfjk.database.windows.net,1433";
$user = "saketh@d6wfefgfjk";
$pwd = "Ramanamurtybv123";
$db = "dine";
// Connect to database.
try {
    $conn = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	//echo("success");
}
catch(Exception $e){
    die(var_dump($e));
	echo("failure, check IC");
}
if(!empty($_POST['name'])){
	$name = $_POST['name'];
}
if(!empty($_POST['number'])){
	$number = $_POST['number'];
}
if(!empty($_POST['time'])){
	$time = $_POST['time'];
}
if(!empty($_POST['comment'])){
	$comment = $_POST['comment'];
}
if(!empty($_POST['size'])){
	$size = $_POST['size'];
}

//if(!empty($_POST)) {
try {

    $date = date("Y-m-d");
    // Insert data
    $sql_insert = "INSERT INTO dine_tbl1 (name, number, size, time, comment, date) 
                   VALUES (?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql_insert);
    $stmt->bindValue(1, $name);
    $stmt->bindValue(2, $number);
    $stmt->bindValue(3, $size);
	$stmt->bindValue(4, $time);
    $stmt->bindValue(5, $comment);
    $stmt->bindValue(6, $date);
    $stmt->execute();
	echo "success";
}
catch(Exception $e) {
    die(var_dump($e));
	echo "fail";
}
//}
/*
$sql_select = "SELECT * FROM registration_tbl";
$stmt = $conn->query($sql_select);
$registrants = $stmt->fetchAll(); 
if(count($registrants) > 0) {
    echo "<h2>People who are registered:</h2>";
    echo "<table>";
    echo "<tr><th>Name</th>";
    echo "<th>Email</th>";
    echo "<th>Date</th></tr>";
    foreach($registrants as $registrant) {
        echo "<tr><td>".$registrant['name']."</td>";
        echo "<td>".$registrant['email']."</td>";
        echo "<td>".$registrant['date']."</td></tr>";
    }
    echo "</table>";
} else {
    echo "<h3>No one is currently registered.</h3>";
}
*/
?>
