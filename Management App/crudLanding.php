<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<link rel="stylesheet" href="css/crudbutton.css">
<body>



<div class="container">
    <div class="row">
        <h2>Data Manager</h2>
    </div>

    <div class="row">

        <div class="col-xs-12">


            <form id="view" method="POST" action="crudView.php" novalidate="novalidate">
                <button type="submit" class="btn btn-success ribbon"><h2>View Data</h2></button>
            </form>

            <form id="add" method="POST" action="crudAdd.php" novalidate="novalidate">
                <button type="submit" class="btn btn-info ribbon"><h2>Add Data</h2></button>
            </form>

            <form id="update" method="POST" action="crudUpdate.php" novalidate="novalidate">
                <button type="submit" class="btn btn-warning ribbon"><h2>Update Data</h2></button>
            </form>
        </div>
    </div>
</div>

</body>