<?php
    session_start();?>

<?php
    $error = "xxx";


if(isset($_POST['submit'])){
    $error = "yyy ";
    if(!(empty($_POST['email']) && (empty($_POST['password'])))){
        $username = $_POST['email'];
        $password = $_POST['password'];

    }
    else {
        $error = "Please enter both username and password!";
        //error notice
    }
}

$_SESSION['error'] = $error;

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="bootstrap.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <title>Welcome to Guerilla Sky Systems
    </title>
</head>
<body style="padding-top: 20px">

<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Guerilla Sky Systems</h3>
                </div>
                <div class="panel-body">
                    <form accept-charset="UTF-8" role="form" action="login.php" method="post">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="E-mail" name="email" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" name="password" type="password" value="">
                                <span style="color:red"><?php echo $_SESSION['error']; ?></span>
                            </div>
                            <input class="btn btn-md btn-success btn-block" type="submit" name="submit" value="Login">
                        </fieldset>
                    </form>
                            <p></p>
                    <p align="center">No login? <u>Look up flight info below</u>.</p>
                            <form action="login.php" method="post">
                            <div class=input-group>
                                <input class="form-control" placeholder="Flight#" name="Flight_number" type="text">
                                <span class="input-group-btn">
                                    <input class="btn btn-md btn-success" type="submit" value="Go">

                                </span>
                            </div>
                            </form>
                            <p></p>
                            <p></p>
                            <div class="dropdown">
                                    <button class="btn btn-block btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Airlines
                                        <span class="caret"></span></button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Delta</a></li>
                                        <li><a href="#">Southwest</a></li>
                                        <li><a href="#">United Airlines</a></li>
                                        <li><a href="#">American Airlines</a></li>
                                        <li><a href="#">JetBlue</a></li>
                                        <li><a href="#">Spirit</a></li>
                                        <li><a href="#">Frontier</a></li>
                                    </ul>
                                </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>