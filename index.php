<?php
$host = "tcp:d6wfefgfjk.database.windows.net,1433";
$user = "saketh@d6wfefgfjk";
$pwd = "Ramanamurtybv123";
$db = "dine";
// Connect to database.
try {
    $conn = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}
catch(Exception $e){
    die(var_dump($e));
}

if(!empty($_POST)) {
try {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $date = date("Y-m-d");
    // Insert data
    $sql_insert = "INSERT INTO registration_tbl (name, email, date) 
                   VALUES (?,?,?)";
    $stmt = $conn->prepare($sql_insert);
    $stmt->bindValue(1, $name);
    $stmt->bindValue(2, $email);
    $stmt->bindValue(3, $date);
    $stmt->execute();
}
catch(Exception $e) {
    die(var_dump($e));
}
echo "<h3>Your're registered!</h3>";
}

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
?>

<html>
<head>
<Title>Registration Form</Title>
<style type="text/css">
    body { background-color: #fff; border-top: solid 10px #000;
        color: #333; font-size: .85em; margin: 20; padding: 20;
        font-family: "Segoe UI", Verdana, Helvetica, Sans-Serif;
    }
    h1, h2, h3,{ color: #000; margin-bottom: 0; padding-bottom: 0; }
    h1 { font-size: 2em; }
    h2 { font-size: 1.75em; }
    h3 { font-size: 1.2em; }
    table { margin-top: 0.75em; }
    th { font-size: 1.2em; text-align: left; border: none; padding-left: 0; }
    td { padding: 0.25em 2em 0.25em 0em; border: 0 none; }
</style>

<style>
body { font-family: arial; font-size: 14px; }
.liveExample { padding: 1em; background-color: #EEEEDD; border: 1px solid #CCC; max-width: 655px; }
.liveExample input { font-family: Arial; }
.liveExample b { font-weight: bold; }
.liveExample p { margin-top: 0.9em; margin-bottom: 0.9em; }
.liveExample select[multiple] { width: 100%; height: 8em; }
.liveExample h2 { margin-top: 0.4em; }

.planet { background-color: #AAEECC; padding: 0.25em; border: 1px solid silver; margin-bottom: 0.5em; font-size: 0.75em; }
.planet.rock { background-color: #EECCAA; }
.liveExample input { margin: 0 0.3em 0 1em; }

li { list-style-type: disc; margin-left: 20px; }
</style>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type='text/javascript' src='knockout-3.1.0.js'></script>
</head>
<body>
<h1>Register here!</h1>
<p>Fill in your name and email address, then click <strong>Submit</strong> to register.</p>
<form method="post" action="index.php" enctype="multipart/form-data" >
      Name  <input type="text" name="name" id="name"/></br>
      Email <input type="text" name="email" id="email"/></br>
      <input type="submit" name="submit" value="Submit" />
</form>
<br/>
<br/>
<div class="liveExample">
<h2>Planets</h2>
<p> 
    <label>
        <input type='checkbox' data-bind='checked: displayAdvancedOptions' />
        Display advanced options
    </label>
</p>
 
<p data-bind='fadeVisible: displayAdvancedOptions'>
    Show:
    <label><input type='radio' name="type" value='all' data-bind='checked: typeToShow' />All</label>
    <label><input type='radio' name="type" value='rock' data-bind='checked: typeToShow' />Rocky planets</label>
    <label><input type='radio' name="type" value='gasgiant' data-bind='checked: typeToShow' />Gas giants</label>
</p>
 
<div data-bind='template: { foreach: planetsToShow,
                            beforeRemove: hidePlanetElement,
                            afterAdd: showPlanetElement }'>
    <div data-bind='attr: { "class": "planet " + type }, text: name'> </div>
</div>
 
<p data-bind='fadeVisible: displayAdvancedOptions'>
    <button data-bind='click: addPlanet.bind($data, "rock")'>Add rocky planet</button>
    <button data-bind='click: addPlanet.bind($data, "gasgiant")'>Add gas giant</button>
</p>
</div>
<script>
var PlanetsModel = function() {
    this.planets = ko.observableArray([
        { name: "Mercury", type: "rock"},
        { name: "Venus", type: "rock"},
        { name: "Earth", type: "rock"},
        { name: "Mars", type: "rock"},
        { name: "Jupiter", type: "gasgiant"},
        { name: "Saturn", type: "gasgiant"},
        { name: "Uranus", type: "gasgiant"},
        { name: "Neptune", type: "gasgiant"},
        { name: "Pluto", type: "rock"}
    ]);
 
    this.typeToShow = ko.observable("all");
    this.displayAdvancedOptions = ko.observable(false);
 
    this.addPlanet = function(type) {
        this.planets.push({
            name: "New planet",
            type: type
        });
    };
 
    this.planetsToShow = ko.computed(function() {
        // Represents a filtered list of planets
        // i.e., only those matching the "typeToShow" condition
        var desiredType = this.typeToShow();
        if (desiredType == "all") return this.planets();
        return ko.utils.arrayFilter(this.planets(), function(planet) {
            return planet.type == desiredType;
        });
    }, this);
 
    // Animation callbacks for the planets list
    this.showPlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).hide().slideDown() }
    this.hidePlanetElement = function(elem) { if (elem.nodeType === 1) $(elem).slideUp(function() { $(elem).remove(); }) }
};
 
// Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
// Could be stored in a separate utility library
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};
 
ko.applyBindings(new PlanetsModel());
</script>
</body>
</html>