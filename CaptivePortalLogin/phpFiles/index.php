<?php

$airportName = "Guerrilla Airport";

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

    <title > Welcome to Guerrilla Sky Systems </title>

</head>
<body style="padding-top: 20px; background-color:black"">

<div class="container">
    <div class="row">
        <div>
            <div class="panel panel-default" style="background-image: url(img/sky-383823_640.jpg); background-size: cover; ">
                <div class="panel-heading" style="text-align: center;">
                    <h1><img src="img/logos/AMS_icon_light.png" class="img-responsive center-block" width="150" height="175" </h1>
                    <h4 class="panel-title" style="text-align: center; font-size: 20px;"><b><?php echo $airportName ?></b></h4>
                </div>
                <div class="panel-body" >
                    <div class="jumbotron" style="padding: 8px;">

                    <form accept-charset="UTF-8" role="form" action="index.php" method="post">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="E-mail" name="email" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" name="password" type="password" value="">
                            </div>

                            <div class="col-xs-12">
                                <button type="submit" formaction="login.php" class="btn btn-success btn-lg btn-block">Login</button>
                            </div>
                        </fieldset>
                    </form>

                    <p></p>

                        <p align="center">No login?</p>
                        <p align="center"><u>Look up flight info below.</u></p>

                    <form action="flight_number.php" method="post">
                        <div class=input-group>
                            <input class="form-control" placeholder="Flight#" name="Flight_number" type="text">
                            <span class="input-group-btn">
                                <input class="btn btn-md btn-success" type="submit" value="Go">
                            </span>
                        </div>
                    </form>

                    <p></p>

                    <h5 style="text-align: center;">Or</h5>
                    <div class="dropdown">
                        <button class="btn btn-block btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Airlines
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <form action="airline.php" method="post">

                                <li><input class="btn btn-link" name="company" type="submit" value="American Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Delta Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="United Airlines"></a></li>

                                <li><input class="btn btn-link" name="company" type="submit" value="Southwest Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="JetBlue Airways"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Air Canada"></a></li>

                                <li><input class="btn btn-link" name="company" type="submit" value="Alaska Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Spirit Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Frontier Airlines"></a></li>

                                <li><input class="btn btn-link" name="company" type="submit" value="Virgin America"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Hawaiian Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Allegiant Air"></a></li>

                            </form>
                        </ul>
                    </div>
                </div>
                    <div class="container col-xs-12">
                        <div class="row">
                            <div class="panel-heading" style="text-align: center;">
                                <h1><img class="img-responsive center-block" src="img/logos/AMS_banner_dark.png"</h1>
                            </div>
                            <div class="col-xs-12">
                                <h5 style="text-align: center;">  Contact: 330-330-3330</h5>
                                <h5 style="text-align: center;">  Address: 100 E lane Nowhere</h5>
                                <h5 style="text-align: center;" >  Copyright Guerrilla Sky Systems 2017</h5>

                            </div>

                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>

</body>
</html>