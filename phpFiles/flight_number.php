<?php
//starting curl service
$ch = curl_init();
//getting flight var from index.php
$flight = $_POST['Flight_number'];
//contacting server
curl_setopt($ch,CURLOPT_URL, "http://rghrist23.pythonanywhere.com/flight_number/" . $flight);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
$output = curl_exec($ch);
//closing server
curl_close($ch);

$output = json_decode($output);
$airportName = "Airport Here";
$airport3code = "APH";
//indexes: 0 = flight_numb, 1=destination, 2=num_passengers
//3=departure time, 4= arrival time, 5=company name, 6=plane id
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
<body style="padding-top: 20px; background-color:black"">

<div class="container">
    <div class="row">
        <div>
            <div class="panel panel-default" style="background-image: url(sky-383823_640.jpg); background-size: cover; ">
                <div class="panel-heading" style="text-align: center;">
                    <h1>Guerrilla Sky Systems</h1>
                    <h4 class="panel-title">Airport here</h4>
                </div>
                <div class="panel-body" >
                    <div class="jumbotron jumbotron-fluid" style="padding:0;">
                        <div class="container">
                            <div class="row">

                                    <div class="col-xs-6">
                                        <h5 style="text-align:center"><u>Flight Number</u></h5>
                                        <h4 style="text-align:center"><?php echo $output[0][0]; ?></h4>
                                    </div>
                                    <div class="col-xs-6">
                                        <h5 style="text-align:center"><u>Flight Gate</u></h5>
                                        <h4 style="text-align:center"><?php echo $output[0][7];?><br></h4>

                                    </div>


                                <div class="col-xs-2">
                                    <h5 style="text-align:center"><?php echo $airport3code;?></h5>
                                </div>
                                <div class="col-xs-2">
                                    <img class="center-block" src="flightout.JPG">

                                </div>
                                <div class="col-xs-4">
                                    <h5 style="text-align:center">Feb 28 2017</h5>
                                </div>
                                <div class="col-xs-4">
                                    <h5 style="text-align:center"><?php echo $output[0][3] ?></h5>

                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">

                                <div class="col-xs-2">
                                    <h5 style="text-align:center"><?php echo $airport3code;?></h5>
                                </div>
                                <div class="col-xs-2">
                                    <img class="center-block" src="flightin.JPG">

                                </div>
                                <div class="col-xs-4">
                                    <h5 style="text-align:center">Feb 28 2017</h5>
                                </div>
                                <div class="col-xs-4">
                                    <h5 style="text-align:center"><?php echo $output[0][4];?></h5>

                                </div>
                            </div>
                        </div>
                        <p style="text-align: center;">Airline: <?php echo $output [0][5];?></p>
                    </div>
                        <form action="index.php" method="post">
                            <button type="submit" class="btn btn-success btn-lg btn-block">Back</button>
                        </form>
                    <div class="container col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <h5 style="text-align: center;">  Contact : 3303303330</h5>
                                <h5 style="text-align: center;">  Address : 100 E lane Nowhere</h5>
                                <h5 style="text-align: center;" >  Copyright Guerrilla Sky Systems 2017</h5>

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