<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewFlights");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
$output = curl_exec($ch);

//closing server
curl_close($ch);

$output = json_decode($output);
$airline = true;
$business = false;
$employee = false;

if (!(empty($_POST['business']))) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewBiz");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    $output = curl_exec($ch);
//closing server
    curl_close($ch);

    $output = json_decode($output);
    $airline = false;
    $business = true;
} else if (!(empty($_POST['employee']))) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewEmp");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    $output = curl_exec($ch);
//closing server
    curl_close($ch);

    $output = json_decode($output);
    $business = false;
    $airline = false;
    $employee = true;


}
?>
<!--<link rel="stylesheet" href="css/crudCSS.css">-->
<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>


<body>
<div class="container-fluid col-xs-8">
    <div class="row" style="text-align: center">
        <h2>Data Viewer</h2>
    </div>
    <div class="col-xs-8">
        <div class="dropdown">
            <button class="btn btn-block btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Airlines
                <span class="caret"></span></button>
            <ul class="dropdown-menu col-xs-12" style="text-align: center">
                <form action="crudView.php" method="post">
                    <li><input class="btn btn-" name="airline" type="submit" value="Airline"></a></li>
                    <li><input class="btn btn-link" name="business" type="submit" value="Business"></a></li>
                    <li><input class="btn btn-link" name="employee" type="submit" value="Employee"></a></li>
                </form>
            </ul>
        </div>
    </div>
    <table class="table-bordered table ">
        <!--Clicking on edit button will begin edit overlay-->
        <!--Clicking on delete button will begin delete overlay-->
        <?php if ($airline) : ?>

            <tr>
                <th>No</th>
                <th>Airlines</th>
                <th>Date</th>
                <th>Destination</th>
            </tr>
            <?php
            foreach ($output as $flight): ?>
                <tr>
                    <td><?php echo $flight[0] ?></td>
                    <td><?php echo $flight[1] ?></td>
                    <td><?php echo $flight[2] ?></td>
                    <td><?php echo $flight[3] ?></td>
                </tr>

            <?php endforeach; ?>
        <?php elseif ($business) : ?>
            <tr>
                <th>Name</th>
                <th>Rent</th>
                <th>Income</th>
                <th>Location</th>
                <th>Lease Time</th>
            </tr>
            <?php
            foreach ($output as $businessInfo): ?>
                <tr>
                    <td><?php echo $businessInfo[0] ?></td>
                    <td><?php echo $businessInfo[1] ?></td>
                    <td><?php echo $businessInfo[2] ?></td>
                    <td><?php echo $businessInfo[3] ?></td>
                    <td><?php echo $businessInfo[4] ?></td>
                </tr>

            <?php endforeach; ?>
        <?php elseif ($employee) : ?>
            <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Security Level</th>
                <th>Position</th>
            </tr>
            <?php
            foreach ($output as $employeeInfo): ?>
                <tr>
                    <td><?php echo $employeeInfo[0] ?></td>
                    <td><?php echo $employeeInfo[1] ?></td>
                    <td><?php echo $employeeInfo[2] ?></td>
                    <td><?php echo $employeeInfo[3] ?></td>
                    <td><?php echo $employeeInfo[4] ?></td>
                </tr>

            <?php endforeach; ?>
        <?php endif; ?>

    </table>
</div>


</body>


