<?php
$host = "tcp:idtjcbmf19.database.windows.net,1433";
$user = "saketh@idtjcbmf19";
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
//$number = '9840346380';
if(!empty($_POST['number'])){
	$number = $_POST['number'];
}
if(!empty($_POST['restaurant'])){
	$restaurant = $_POST['restaurant'];
}
//echo $restaurant;
//echo $number;
$sql_select = "SELECT * FROM dine_tbl1 WHERE number = " . $number . " AND restaurant = '".$restaurant."'";
//echo $sql_select;

$stmt = $conn->query($sql_select);
$registrants = $stmt->fetchAll(); 
$visitCount = count($registrants);
echo count($registrants) + " Visits";
if($visitCount > 3) echo "He deserves a loyalty gift";
if(count($registrants) > 0) {
    echo "<h2>Earlier visits of the customer:</h2>";
    echo "<table>";
    echo "<tr><th>Name</th>";
    echo "<th>Number</th>";
    echo "<th>Date</th>";
    echo "<th>Time</th>";
    echo "<th>Size</th>";
    echo "<th>Comment</th></tr>";

    foreach($registrants as $registrant) {
        echo "<tr><td>".$registrant['name']."</td>";
        echo "<td>".$registrant['number']."</td>";
        echo "<td>".$registrant['date']."</td>";
        echo "<td>".$registrant['time']."</td>";
        echo "<td>".$registrant['size']."</td>";
        echo "<td>".$registrant['comment']."</td></tr>";
    }
    echo "</table>";
} else {
    echo "<h3>No recent visit.</h3>";
}
?>
