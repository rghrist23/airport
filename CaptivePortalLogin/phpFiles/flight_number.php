<?php
//starting curl service
$ch = curl_init();

//getting flight var from index.php
$flight = $_POST['Flight_number'];

//contacting server
curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/flight_number/" . $flight);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

//executing server
$output = curl_exec($ch);

//closing server
curl_close($ch);

$output = json_decode($output);
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
    <title>Welcome to Guerrilla Sky Systems
    </title>
</head>
<body style="padding-top: 20px; background-color:black"
">

<div class="container">
    <div class="row">
        <div>
            <div class="panel panel-default" round-image: url(img
            /sky-383823_640.jpg); background-size: cover;">
            <div class="panel-heading" style="text-align: center; background-color: transparent; color: #000000;">
                <a href="index.php"><img src="img/logos/AMS_icon_light.png" width="150" height="200"
                                         style="padding: 10px"></a>
                <h4 class="panel-title" style="text-align: center; font-size: 30px;"><?php echo $airportName ?></h4>
            </div>
            <div class="panel-body">
                <div class="jumbotron jumbotron-fluid" style="padding:0;">
                    <div class="container">
                        <h3 style="text-align: center;"><?php echo $output [0][4]; ?></h3>
                        <div class="row">

                            <div class="col-xs-6">
                                <h5 style="text-align:center"><u>Flight Number</u></h5>
                                <h4 style="text-align:center"><?php echo $output[0][0]; ?></h4>
                            </div>
                            <div class="col-xs-6">
                                <h5 style="text-align:center"><u>Flight Gate</u></h5>
                                <h4 style="text-align:center"><?php echo $output[0][1]; ?><br></h4>
                            </div>

                            <div class="col-xs-2">
                                <h5 style="text-align:center">Arrival Time</h5>
                            </div>
                            <div class="col-xs-2">
                                <img class="center-block" src="img/flightout.JPG">

                            </div>
                            <div class="col-xs-4">
                                <h5 style="text-align:center"><?php echo $output[0][5]; ?></h5>
                            </div>
                            <div class="col-xs-4">
                                <h5 style="text-align:center"><?php echo $output[0][2] ?></h5>

                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">

                            <div class="col-xs-2">
                                <h5 style="text-align:center">Departure Time</h5>
                            </div>
                            <div class="col-xs-2">
                                <img class="center-block" src="img/flightin.JPG">

                            </div>
                            <div class="col-xs-4">
                                <h5 style="text-align:center"><?php echo $output[0][5]; ?></h5>
                            </div>
                            <div class="col-xs-4">
                                <h5 style="text-align:center"><?php echo $output[0][3]; ?></h5>

                            </div>
                        </div>
                    </div>
                </div>
                <form action="index.php" method="post">
                    <button type="submit" class="btn btn-success btn-lg btn-block">Back</button>
                </form>
                <div class="container col-xs-12">
                    <div class="row">
                        <div class="panel-heading" style="text-align: center;">
                            <h1><img class="img-responsive center-block" src="img/logos/AMS_banner_dark.png"</h1>
                        </div>
                        <div class="col-xs-12">
                            <h5 style="text-align: center;"> Contact: 330-330-3330</h5>
                            <h5 style="text-align: center;"> Address: 100 E Lane Nowhere</h5>
                            <h5 style="text-align: center;"> Copyright Guerrilla Sky Systems 2017&#153</h5>

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