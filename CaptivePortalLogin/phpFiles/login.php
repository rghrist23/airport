<?php
//starting curl service
$ch = curl_init();
$ch2 = curl_init();

//getting login var from index.php
$email = $_POST['email'];
$password = $_POST['password'];

//contacting server
curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/user_login/" . $email . "/" . $password);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch2, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/ticket_info/" . $email . "/" . $password);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);

//executing server
$output = curl_exec($ch);
$output2 = curl_exec($ch2);

//closing server
curl_close($ch);
curl_close($ch2);

// Output
$output = json_decode($output);
$output2 = json_decode($output2);

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

    <title>Welcome to Guerrilla Sky Systems</title>

    <style>
        table.center {
            margin-left: auto;
            margin-right: auto;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>

<body style="padding-top: 20px; background-color:black"
">

<div class="container">
    <div class="row">
        <div>
            <div class="panel panel-default"
                 style="background-image: url(img/sky-383823_640.jpg); background-size: cover;">
                <div class="panel-heading" style="text-align: center; background-color: transparent; color: #000000;">
                    <a href="index.php"><img src="img/logos/AMS_icon_light.png" width="150" height="200"
                                             style="padding: 10px"></a>
                    <h4 class="panel-title" style="text-align: center; font-size: 30px;"><?php echo $airportName ?></h4>
                    <a href="map.html">
                        <h1 style="text-align: center; color: #0f0f0f">
                            Click for a map of the Airport
                        </h1>
                    </a>
                </div>
                <div class="panel-body">
                    <div class="jumbotron jumbotron-fluid" style="padding:0;">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h3 style="text-align: center;"> Welcome <?php echo $output[0][1] ?>!</h3>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4">
                                        <h5 style="text-align: center"><u>Ticket Number</u></h5>
                                        <h4 style="text-align: center"><?php echo $output2[0][5]; ?></h4>
                                    </div>
                                    <div class="col-xs-4">
                                        <h5 style="text-align:center"><u>Flight Number</u></h5>
                                        <h4 style="text-align:center"><?php echo $output2[0][0]; ?></h4>
                                    </div>
                                    <div class="col-xs-4">
                                        <h5 style="text-align:center"><u>Flight Gate</u></h5>
                                        <h4 style="text-align:center"><?php echo $output2[0][1]; ?><br></h4>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-xs-2">
                                        <h5 style="text-align:center">Arrival Time</h5>
                                    </div>
                                    <div class="col-xs-2">
                                        <img class="center-block" src="img/flightout.JPG">
                                    </div>
                                    <div class="col-xs-4">
                                        <h5 style="text-align:center"><?php echo $output2[0][4]; ?></h5>
                                    </div>
                                    <div class="col-xs-4">
                                        <h5 style="text-align:center"><?php echo $output2[0][2] ?></h5>
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
                                        <h5 style="text-align:center"><?php echo $output2[0][4]; ?></h5>
                                    </div>
                                    <div class="col-xs-4">
                                        <h5 style="text-align:center"><?php echo $output2[0][3]; ?></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="jumbotron col-xs-12" style="padding: 2px;">
                            <p style="text-align: center;">History</p>
                            <table class="center" style="text-align: center;">
                                <tr>
                                    <th>Flight#</th>
                                    <th>Destination</th>
                                    <th>Date</th>
                                </tr>
                                <tr>
                                    <td>913</td>
                                    <td>Chicago</td>
                                    <td>02/20/17</td>
                                </tr>
                                <tr>
                                    <td>354</td>
                                    <td>San Francisco</td>
                                    <td>02/04/17</td>
                                </tr>
                                <tr>
                                    <td>903</td>
                                    <td>Paris</td>
                                    <td>01/15/17</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <form action="index.php" method="post">
                        <button type="submit" class="btn btn-success btn-lg btn-block">Back</button>
                    </form>
                    <div class="panel-heading"
                         style="text-align: center; background-color: transparent; color: #000000;">
                        <a href="about.html"><img src="img/logos/AMS_banner_dark.png"></a>
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

</body>
</html>