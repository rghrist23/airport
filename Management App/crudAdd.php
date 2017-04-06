<?php
$airline = true;
$business = false;
$employee = false;
if (!empty($_POST['airlineName']) && !empty($_POST['planeNumber'])) {
    $airlineName = $_POST['airlineName'];
    $planeNumber = $_POST['planeNumber'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/insertAirline/" . $airlineName . "/" . $planeNumber);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
    curl_exec($ch);

//closing server
    curl_close($ch);


} else if (!(empty($_POST['business']))) {
    if (!empty($_POST['businessName']) && !empty($_POST['businessRent']) && !empty($_POST['businessIncome']) && !empty($_POST['businessLocation'])
        && !empty($_POST['businessLease'])
    ) {

        $bizName = $_POST['businessName'];
        $bizRent = $_POST['businessRent'];
        $bizIncome = $_POST['businessIncome'];
        $bizLocation = $_POST['businessLocation'];
        $bizLease = $_POST['businessLease'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/insertBiz/" . $bizName . "/" . $bizRent . "/" . $bizIncome . "/" . $bizLocation . "/" . $bizLease);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
        curl_exec($ch);
//closing server
        curl_close($ch);
    }

    $airline = false;
    $business = true;

} else if (!(empty($_POST['employee']))) {
    if (!empty($_POST['employeeID']) && !empty($_POST['employeeName']) && !empty($_POST['employeePhone']) && !empty($_POST['employeeSalary'])
        && !empty($_POST['employePosition'])
    ) {

        $empID = $_POST['employeeID'];
        $empName = $_POST['employeeName'];
        $empPhone = $_POST['employeePhone'];
        $empSalary = $_POST['employeeSalary'];
        $empPosition = $_POST['employePosition'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/insertEmp/" . $empID . "/" . $empName . "/" . $empPhone . "/" . $empSalary . "/" . $empPosition);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //executing server
        curl_exec($ch);
        //closing server
        curl_close($ch);
    }
    $business = false;
    $airline = false;
    $employee = true;


}
?>
<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>


<link rel="stylesheet" href="css/crudCSS.css">

<body>

<div id="container-fluid col-xs-8">
    <div class="row" style="text-align: center">
        <h2>Data Creator</h2>
    </div>
    <div class="col-xs-8">
        <div class="dropdown">
            <button class="btn btn-block btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Airlines
                <span class="caret"></span></button>
            <ul class="dropdown-menu col-xs-12" style="text-align: center">
                <form action="crudAdd.php" method="post">
                    <li><input class="btn btn-" name="airline" type="submit" value="Airline"></a></li>
                    <li><input class="btn btn-link" name="business" type="submit" value="Business"></a></li>
                    <li><input class="btn btn-link" name="employee" type="submit" value="Employee"></a></li>
                </form>
            </ul>
        </div>
    </div>
    <form action="crudAdd.php" method="post">
        <?php if ($airline) : ?>

            <table>
                <tr>
                    <td>Airline Name:</td>
                    <td><input name="airlineName" type="text"></td>

                </tr>
                <tr>
                    <td>Airline Number of Planes:</td>
                    <td><input name="planeNumber" type="text"></td>
                </tr>
                <tr>
                    <td align="center">
                        <button type="submit" value="Submit">Submit
                    </td>
                </tr>
            </table>
        <?php elseif ($business) : ?>

            <table>
                <tr>
                    <td>Business Name:</td>
                    <td><input name="businessName" type="text"></td>
                </tr>
                <tr>
                    <td>Business Rent(ex. 2500):</td>
                    <td><input name="businessRent" type="text"></td>
                </tr>
                <tr>
                    <td>Business Income Projection( ex. 100000):</td>
                    <td><input name="businessIncome" type="text"></td>
                </tr>
                <tr>
                    <td>Business Location:</td>
                    <td><input name="businessLocation" type="text"></td>
                </tr>
                <tr>
                    <td>Business Lease Length(12,24,36,48,60,72):</td>
                    <td><input name="businessLease" type="text"></td>
                </tr>
                <tr>
                    <td align="center">
                        <button type="submit" value="Submit">Submit
                    </td>
                </tr>
            </table>
        <?php elseif ($employee) : ?>

            <table>
                <tr>
                    <td>Employee ID(ex. 12345):</td>
                    <td><input name="employeeID" type="text"></td>

                </tr>
                <tr>
                    <td>Employee Name:</td>
                    <td><input name="employeeName" type="text"></td>
                </tr>
                <tr>
                    <td>Employee Phone(ex. 333-333-3333):</td>
                    <td><input name="employeePhone" type="text"></td>
                </tr>
                <tr>
                    <td>Employee Salary(ex. 20000):</td>
                    <td><input name="employeeSalary" type="text"></td>
                </tr>
                <tr>
                    <td>Employee Position:</td>
                    <td><input name="employeePosition" type="text"></td>
                </tr>
                <tr>
                    <td align="center">
                        <button type="submit" value="Submit">Submit
                    </td>
                </tr>
            </table>
        <?php endif; ?>
    </form>
</div>
</div>
</body>
