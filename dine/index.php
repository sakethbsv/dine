<?php
include_once 'db_connect.php';
include_once 'functions.php';

sec_session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Waitlist by Dine</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="css/popupwindow.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
  </head>

  <body>
    <?php if (login_check($mysqli) == true) : ?>
    <div id="pop-up-1" class="pop-up-display-content">
    <h1>Basic</h1>
    <p>Enim, voluptate, neque facilis incidunt maiores quasi placeat harum itaque ducimus cumque quas expedita hic voluptas culpa error porro qui ullam iste provident mollitia fuga repellat excepturi repellendus earum at sapiente optio dolores ratione totam unde minima quibusdam delectus fugiat nihil nobis inventore dolorum quod. Deserunt, iusto, velit laudantium molestiae laborum neque debitis officia alias cum nulla hic amet consectetur explicabo quod ratione aliquid sed iure minima tempora in tempore maxime fuga quas numquam possimus cumque earum ipsa exercitationem iste.</p>
    </div>
    <div id="wrap">
        <div class="container-fluid" style="margin-top:0px">

            <!-- This is the navigation bar at the top of the page -->
            <div class="row" style="background-color:#ECEDEF;padding:5px;">
                <div class="col-xs-1">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-align-justify"></span>
                        </button>

                        <ul class="dropdown-menu" role="menu">
                            <li class="disabled"><a href="#">Current Waitlist</a>
                            </li>
                            <li><a href="#" onClick="Sync()">Sync</a>
                            </li>
                            <li><a href="#">Account Settings</a>
                            </li>
                            <li class="divider"></li>
                            <li><a href="logout.php" style="color:red">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-4 col-xs-push-4" style="font-size:170%;color:#AAAAAB">Dine Waitlist</div>
                <div class="col-xs-1 col-xs-push-6">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="float:right;" class="btn btn-default">
                            <span>Add</span>
                        </button>
                        <div class="dropdown-menu" role="menu" style="border:1px solid; padding: 20px; width: 400px">
                            <form role="form" id="party-form">
                                <div class="form-group">
                                    <label for="exampleInputName">Name</label>
                                    <input id="party-name" type="text" class="form-control" id="exampleInputName" placeholder="Enter the name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPhone">Phone Number</label>
                                    <input id="party-phone" type="tel" class="form-control" id="exampleInputPhone" placeholder="Enter the Phone number">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputNotes">Notes</label>
                                    <textarea id="party-notes" class="form-control" rows="3" placeholder="Enter any comments"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputSize">Select the Party Size</label>
                                    <select id="party-size" class="form-control">
                                        <option>1</option>
                                        <option selected="selected">2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                    <!--input type="number" class="form-control" id="exampleInputPhone" placeholder="Enter the size of the party"-->
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputSize">Approximate Wait Time</label>
                                    <select id="party-wait-time" class="form-control">
                                        <option selected="selected">10 mins</option>
                                        <option>15 mins</option>
                                        <option>20 mins</option>
                                        <option>30 mins</option>
                                        <option>45 mins</option>
                                        <option>1 hour</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-default">Add Party</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
                <table id="waitlist-table" class="table">
                    <thead>
                        <tr>
                            <th class="col-sm-2">Status</th>
                            <th class="col-sm-1">Size</th>
                            <th class="col-sm-3">Name</th>
                            <th class="col-sm-1">Arrived</th>
                            <th class="col-sm-1">Quoted</th>
                            <th class="col-sm-1">Waiting</th>
                            <th class="col-sm-1">Notify</th>
                            <th class="col-sm-1">Seat</th>
                            <th class="col-sm-1">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <!--p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p-->

        </div>
    </div>

    <div id="footer">
        <div class="container-fluid">
            <div class="row heading"><div class="col-xs-4 col-xs-push-4">ANALYTICS</div></div>
            <div class="row">
                <div class="col-xs-3 heading3">Total Waiting</div>
                <div class="col-xs-3 heading3">Total Seated</div>
                <div class="col-xs-6 heading3">Average WaitTime</div>
            </div>
            <div class="row"><div class="white-line"></div></div>
            <div class="row">
                <div id="total-waiting" class="col-xs-3">34</div>
                <div id="total-seated" class="col-xs-3">123</div>
                <div id="avg-wait-time" class="col-xs-6">
                    <div class="row">
                        <div class="col-xs-4 heading3">1-4</div>
                        <div class="col-xs-4 heading3">5-7</div>
                        <div class="col-xs-4 heading3">7+</div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4"><div class="row"><div id="wait-cat-1" class="col-xs-3 heading2">34</div><div class="col-xs-9 heading3">Mins</div></div></div>
                        <div class="col-xs-4"><div class="row"><div id="wait-cat-2"class="col-xs-3 heading2">34</div><div class="col-xs-9 heading3">Mins</div></div></div>
                        <div class="col-xs-4"><div class="row"><div id="wait-cat-3"class="col-xs-3 heading2">34</div><div class="col-xs-9 heading3">Mins</div></div></div>
                    </div>
                </div>
            </div>
            <!--p class="muted credit">Example courtesy <a href="http://martinbean.co.uk">Martin Bean</a> and <a href="http://ryanfait.com/sticky-footer/">Ryan Fait</a>.</p-->
        </div>
    </div>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script-->
    <!--script src="js/jquery-2.1.0.min.js"></script-->
    
    <!-- get username from logged in data - php -->
    <script>
    var username = "<?php echo htmlentities($_SESSION['username']); ?>";
    </script>
    <script src="js/jquery-1.4.4.min.js"></script>
    <script src="js/jquery.inlineedit.js"></script>
    <script src="js/jquery-ui-1.8.7.custom.min.js"></script>
    <script src="js/pubsub.js"></script>

    <!-- Maintain this particular order for this to work since bootstrap needs the latest version of jquery-->
    <script src="js/jquery-2.1.0.min.js"></script>
    <script src="js/pubsub.js"></script>
    <script src="js/main.js"></script>
    <script src="js/popupwindow.js"></script>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
<?php else : ?>
    <div style="text-align:center; font-size:25px; position:relative; top:200px">
        <span class="error">You are not authorized to access this page.</span> Please <a href="login.php">login</a>.
    </div>
<?php endif; ?>
</body>

</html>
