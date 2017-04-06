<?php
//starting curl service
$ch = curl_init();

//getting flight var from index.php
$airline = $_POST['company'];

//contacting server
curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/airline_flight/" . $airline);
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
            padding: 3px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }

        body {
            text-align: center;
        }
    </style>
</head>

<body style="padding-top: 20px; background-color:black;">

<div class="container">
    <div class="row">
        <div>
            <div class="panel panel-default"
                 style="background-image: url(img/sky-383823_640.jpg); background-size: cover;">
                <div class="panel-heading" style="text-align: center; background-color: transparent; color: #000000;">
                    <a href="index.php"><img src="img/logos/AMS_icon_light.png" width="150" height="200"
                                             style="padding: 10px"></a>
                    <h4 class="panel-title" style="text-align: center; font-size: 30px;"><?php echo $airportName ?></h4>
                </div>
                <div class="panel-body">
                    <div class="jumbotron col-xs-12" style="padding: 2px;">
                        <p style="text-align: center;"><?php echo $output[0][4]; ?></p>
                        <table class="center" style="text-align: center;">
                            <tr>
                                <td style="text-align: center;">Flight#</td>
                                <td style="text-align: center;">Destination</td>
                                <td style="text-align: center;">Call Sign</td>
                                <td style="text-align: center;">Departure</td>
                                <td style="text-align: center;">Gate</td>
                            </tr>
                            <?php
                            foreach ($output as $flight): ?>
                                <tr>
                                    <td style="text-align: center;"><?php echo $flight[0] ?></td>
                                    <td style="text-align: center;"><?php echo $flight[1] ?></td>
                                    <td style="text-align: center;"><?php echo $flight[5] ?></td>
                                    <td style="text-align: center;"><?php echo $flight[2] ?></td>
                                    <td style="text-align: center;"><?php echo $flight[3] ?></td>
                                </tr>

                            <?php endforeach; ?>

                        </table>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-block btn-primary btn-lg dropdown-toggle" type="button"
                                data-toggle="dropdown">Airlines
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <form action="airline.php" method="post">

                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="American Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Delta Airlines"></a>
                                </li>
                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="United Airlines"></a></li>

                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="Southwest Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="JetBlue Airways"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Air Canada"></a>
                                </li>

                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="Alaska Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="Spirit Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="Frontier Airlines"></a></li>

                                <li><input class="btn btn-link" name="company" type="submit" value="Virgin America"></a>
                                </li>
                                <li><input class="btn btn-link" name="company" type="submit"
                                           value="Hawaiian Airlines"></a></li>
                                <li><input class="btn btn-link" name="company" type="submit" value="Allegiant Air"></a>
                                </li>

                            </form>
                        </ul>
                    </div>
                    <br>
                    <br>
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
                                <h5 style="text-align: center;"> Address: 100 E lane Nowhere</h5>
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