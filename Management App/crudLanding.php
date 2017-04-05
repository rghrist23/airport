<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<link rel="stylesheet" href="css/crudbutton.css">
<body>



<div class="container">
    <div class="row" align = "center">
        <h1>Data Manager</h1>
        <br>
    </div>

    <div class="row">

        <div class="col-xs-12">
            <table style="width:100%">
                <tr>
                    <td align = "center">
                        <form id="view" method="POST" action="crudView.php" novalidate="novalidate">
                        <button type="submit" class="btn btn-success img-success"></button>
                        </form>
                        <h2>View Data</h2>
                    </td>
                    <td align = "center">
                        <form id="add" method="POST" action="crudAdd.php" novalidate="novalidate">
                        <button type="submit" class="btn btn-info img-info"></button>
                        </form>
                        <h2>Add Data</h2>
                    </td>
                    <td align = "center">
                        <form id="update" method="POST" action="crudUpdate.php" novalidate="novalidate">
                        <button type="submit" class="btn btn-warning img-warning"></button>
                        </form>
                        <h2>Update Data</h2>
                    </td>
                </tr>
        
            </table>

        </div>
    </div>
</div>

</body>