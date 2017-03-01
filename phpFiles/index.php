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
<body style="padding-top: 20px; background-color:black"">

<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default" style="background-image: url(sky-383823_640.jpg); background-size: cover; ">
                <div class="panel-heading" style="text-align: center;">
                    <h1>Guerilla Sky Systems</h1>
                    <h4 class="panel-title">Airport here</h4>
                </div>
                <div class="panel-body" >
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
                    <p align="center">No login? <u>Look up flight info below</u>.</p>
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
                            <li><a href="airline.php">Delta</a></li>
                            <li><a href="airline.php">Southwest</a></li>
                            <li><a href="airline.php">United Airlines</a></li>
                            <li><a href="airline.php">American Airlines</a></li>
                            <li><a href="airline.php">JetBlue</a></li>
                            <li><a href="airline.php">Spirit</a></li>
                            <li><a href="airline.php">Frontier</a></li>
                        </ul>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h5 style="text-align: center;">Contact : 3303303330</h5>
                            <h5 style="text-align: center;">Address : 100 E lane Nowhere</h5>
                            <h5 style="text-align: center;" >Copyright Guerilla Sky Systems 2017</h5>

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