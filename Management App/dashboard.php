<?php

if (!empty($_POST['username']) && !empty($_POST['password'])) {

//starting curl service
    $ch = curl_init();

//getting login var from index.php
    $email = $_POST['username'];
    $password = $_POST['password'];

//contacting server
    curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/user_login/" . $email . "/" . $password);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);


//executing server
    $userOutput = curl_exec($ch);

//closing server
    $userOutput = json_decode($userOutput);
    curl_close($ch);

}
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewFlightTime");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
$flightOutput = curl_exec($ch);

$flightOutput = json_decode($flightOutput);

$foursixam = 0;
$sixeightam = 0;
$eighttenam = 0;
$ten12pm = 0;
$twelvetwopm = 0;
$twofourpm = 0;
$foursixpm = 0;
$sixeightpm = 0;
$eighttenpm = 0;
$tentwelveam = 0;
$twelvetwoam = 0;
$twofouram = 0;
curl_close($ch);

//foreach ($flightOutput as $flight) {
//}
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://rghrist23.pythonanywhere.com/viewEmpJobs");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//executing server
$empOutput = curl_exec($ch);

//closing server
$empOutput = json_decode($empOutput);


$janitor = 0;
$pilot = 0;
$flightattendant = 0;
foreach ($empOutput as $employee){
    if ($employee[0] == "Janitor") {
        $janitor++;
    }
    else if ($employee[0] == "Pilot") {
        $pilot++;
    }
    else if ($employee[0] == "Flight Attendant") {
        $flightattendant++;
    }
}
curl_close($ch);

?>


<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<script src="js/RGraph/libraries/RGraph.svg.bar.js"></script>
<script src="js/RGraph/libraries/RGraph.svg.common.core.js"></script>
<script src="js/RGraph/libraries/RGraph.svg.common.tooltips.js"></script>
<script src="js/RGraph/libraries/RGraph.svg.pie.js"></script>
<!-- dashboard welcome page -->
<body>

<div style="padding: 15px">
    <h2>Dashboard</h2>
    <div style="width: 800px; height: 300px" id="chart-container"></div>
    <div style="width: 350px; height: 350px" id="pie-container"></div>
</div>
<div class="row">
</div>
</body>

<script>
    new RGraph.SVG.Bar({
        id: 'chart-container',
        data: [2,2,4,1,1,2],
        options: {
            xaxisLabels: ['4-8 AM', '8 AM - 12 AM', '12-4 PM', '4-8 PM', '8 PM - 12 AM', '12-4 AM',],
            gutterLeft: 100,
            colors: [
                'red','blue','pink','green','rgb(255,67,169)','brown','yellow', 'purple'
            ],
            colorsSequential: true,
            yaxisUnitsPre: 'Flights : ',
            yaxisDecimals: 0,
            yaxis: false,
            backgroundGridVlines: false,
            backgroundGridBorder: false,
            title: 'Flight Times Today'
        }
    }).grow();
</script>

<script>
    new RGraph.SVG.Pie({
        id: 'pie-container',
        data: [<?php echo $flightattendant ?>,<?php echo $pilot ?>,<?php echo $janitor ?>],
        options: {
            exploded: 2,
            donut: true,
            title: "Employee Positions",
            tooltips: ['Flight Attendant Total : ' + <?php echo $flightattendant ?>,
                'Janitor Total : ' + <?php echo $pilot ?>, 'Pilot Total : ' + <?php echo $janitor ?>],
            shadow: true,
            colors: [
                'Gradient(red:red:red:#faa:red)',
                'Gradient(#0f0:#0f0:#0f0:#afa:#0f0)',
                'Gradient(#00f:#00f:#00f:#aaf:#00f)',
                'Gradient(gray:gray:gray:#ccc:gray)',
                'Gradient(#f0f:#f0f:#f0f:#faf:#f0f)',
                'Gradient(#ff0:#ff0:#ff0:#ffa:#ff0)',
                'Gradient(red:red:red:#faa:red)'
            ]
        }
    }).roundRobin();
</script>
</html>