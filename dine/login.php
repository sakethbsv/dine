<?php
include_once 'db_connect.php';
include_once 'functions.php';
//echo "Works";
sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Secure Login: Log In</title>
        <link rel="stylesheet" href="styles/main.css" />
        <script type="text/JavaScript" src="js/sha512.js"></script> 
        <script type="text/JavaScript" src="js/forms.js"></script> 
    </head>
    <body><center>
        <?php
        if (isset($_GET['error'])) {
            echo '<p class="error" style="color:red; text-align:center;">Error Logging In!</p>';
        }
        ?> 
        <div style="background-color:#CCC; top:0px; left:0px; width:inherit; height:200px">
        <form style="font-size:20px; color:#03F; position:relative; vertical-align:central; top:60px" action="process_login.php" method="post" name="login_form" >                      
            Email: <input type="text" name="email" />
            Password: <input type="password" 
                             name="password" 
                             id="password" onKeyPress="if(event.keyCode == 13) formhash(this.form, this.form.password);"/>
            <input type="button" 
                   value="Login" 
                   onclick="formhash(this.form, this.form.password);" /> 
        </form>
        </div>
        <br/><br/>
        <p>If you don't have a login, please <a href="register.php">register</a></p>
        <p>You can logout <a href="logout.php">here</a>.</p>
        <p>You are currently logged <?php echo $logged ?>.</p>
        </center>
    </body>
</html>