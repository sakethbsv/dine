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
    <body topmargin="100"><center>
        <?php
        if (isset($_GET['error'])) {
            echo '<p class="error" style="color:red; text-align:center;">Error Logging In!</p>';
        }
        ?> 
        <form style="font-size:20px; color:#03F" action="process_login.php" method="post" name="login_form" >                      
            Email: <input type="text" name="email" />
            Password: <input type="password" 
                             name="password" 
                             id="password"/>
            <input type="button" 
                   value="Login" 
                   onclick="formhash(this.form, this.form.password);" /> 
        </form>
        <br/><br/>
        <p>If you don't have a login, please <a href="register.php">register</a></p>
        <p>You can logout <a href="logout.php">here</a>.</p>
        <p>You are currently logged <?php echo $logged ?>.</p>
        </center>
    </body>
</html>