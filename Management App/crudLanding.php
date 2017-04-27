<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<link rel="stylesheet" href="css/crudbutton.css">
<body>


<div class="container col-xs-8">
    <div class="row" align="center">
    </div>

    <div class="row">

        <div class="col-xs-12">
            <table class = "tabel">
                <tr><td  colspan="3" align="center" > <h2>Data Manager</h2>
        <br></td></tr>
                <tr>
                    <td align="center">
                        <form id="view" method="POST" action="crudView.php" novalidate="novalidate">
                            <button type="submit" class="btn btn-success img-success"></button>
                        </form>
                        <h3>View Data</h3>
                    </td>
                    <td align="center">
                        <form id="add" method="POST" action="crudAdd.php" novalidate="novalidate">
                            <button type="submit" class="btn btn-info img-info"></button>
                        </form>
                        <h3>Add Data</h3>
                    </td>
                    <td align="center">
                        <form id="update" method="POST" action="crudUpdate.php" novalidate="novalidate">
                            <button type="submit" class="btn btn-warning img-warning"></button>
                        </form>
                        <h3>Update Data</h3>
                    </td>
                </tr>

            </table>

        </div>
    </div>
</div>

</body>