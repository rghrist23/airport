<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<?php
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewFlights");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    $output = curl_exec($ch);

//closing server
    curl_close($ch);

    $output = json_decode($output);
    print_r($output);


if (!(empty($_POST['business']))) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/airline_flight/" . $airline);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    $output = curl_exec($ch);
//closing server
    curl_close($ch);

    $output = json_decode($output);
}
else if (!(empty($_POST['employee']))){
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, "http://rghrist23.pythonanywhere.com/airline_flight/" . $airline);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    $output = curl_exec($ch);
//closing server
    curl_close($ch);

    $output = json_decode($output);


}
//indexes: 0 = flight_numb, 1=destination, 2=num_passengers
//3=departure time, 4= arrival time, 5=company name, 6=plane id
?>
<link rel="stylesheet" href="css/crudCSS.css">



<body>
<div class="container-fluid">
    <div class="row">
        <h2>Data Viewer</h2>
    </div>
    <h2>Switch to:</h2>
    <div class="col-xs-6">
        <div class="dropdown">
                    <button class="btn btn-block btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Airlines
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu col-xs-12" style="text-align: center" >
                        <form action="crudView.php" method="post">
                            <li><input class="btn btn-" name="airline" type="submit" value="Airline"></a></li>
                            <li><input class="btn btn-link" name="business" type="submit" value="Business"></a></li>
                            <li><input class="btn btn-link" name="employee" type="submit" value="Employee"></a></li>
                        </form>
                    </ul>
        </div>
    </div>
        <table class = "data">
            <!--Clicking on edit button will begin edit overlay-->
            <!--Clicking on delete button will begin delete overlay-->
            <tr>
                <th>No</th>
                <th>Airlines</th>
                <th>Date</th>
            </tr>
            <?php
            foreach ($output as $flight): ?>
                <tr>
                    <td><?php echo $flight[0] ?></td>
                    <td><?php echo $flight[5] ?></td>
                    <td><?php echo $flight[7] ?></td>
                </tr>

            <?php endforeach;?>
        </table>
    </div>


</body>


