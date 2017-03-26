<?php include 'head.html' ?>
<?php include 'sidebar_navbar.html' ?>
<link rel="stylesheet" href="css/crudCSS.css">

<body>
<div class="container-fluid">
    <div class="row">
        <h2>Data Viewer</h2>
    </div>
    <form>
        <table class = "head">
            <tr>
                <td colspan = "2">Switch to: <select id = "sort"><option>Airlines</option><option>Businesses</option><option>Employees</option></select></td>
                <td align = "right"><input type ="submit" value ="Go" id = "go"> </td>
            </tr>
        </table>
    </form>
        <table class = "data">
            <!--Clicking on edit button will begin edit overlay-->
            <!--Clicking on delete button will begin delete overlay-->
            <tr>
                <th>No</th>
                <th>Airlines</th>
                <th>Flights</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>1</td>
                <td>United Airlines</td>
                <td>Dobby Dabby</td>
                <td align = "center"><input type ="submit" value ="Edit"> <input type ="submit" value ="Delete"></td>
            </tr>
            <tr>
                <td>2</td>
                <td>United Airlines</td>
                <td>Dobby Dabby</td>
                <td align = "center"><input type ="submit" value ="Edit"> <input type ="submit" value ="Delete"></td>
            </tr>
            <tr>
                <td>3</td>
                <td>United Airlines</td>
                <td>Dobby Dabby</td>
                <td align = "center"><input type ="submit" value ="Edit"> <input type ="submit" value ="Delete"></td>
            </tr>
        </table>
    </div>
</div>

</body>


