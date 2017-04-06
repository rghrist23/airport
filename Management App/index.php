<?php //welcome page for staff of airport ?>
<?php include 'head.html' ?>
<body>

<div class="intro-header">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message">
                    <h1><img src="img/logos/AMS_icon_light.png" class="img-responsive center-block" width="150" height ="229" </h1>
                    <h3>The system for Airports</h3>
                    <hr class="intro-divider">
                    <div class="pagination">
                        <button type="button" class="btn btn-success btn-lg" data-toggle="modal" href="#login-overlay">Login</button>
                        <br> <br>
                        <form action="forgotPass.php" method="post">
                        <button type="submit" class="btn btn-warning btn-md" data-to>Forgot Password</button>
                        </form>
                    </div>
                    <!--
                    <h1><img src="img/logos/AMS_banner_dark.png" class="img-responsive center-block" </h1>
                    this does not look right to me - rick -->
                </div>
            </div>
        </div>

    </div>
    <!-- /.container -->

    <!-- begin modal -->
    <div id="login-overlay" class="modal fade col-lg-4 col-lg-offset-4">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel" style="color:red;">Guerrilla Sky Systems</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" style="color=black;">
                        <div class="well">
                            <form id="loginForm" method="POST" action="dashboard.php" novalidate="novalidate">
                                <div class="form-group">
                                    <label for="username" class="control-label" style="color: red;">Username</label>
                                    <input type="email" class="form-control" id="username" name="username" value="" required="" title="Please enter you username" placeholder="Example@gmail.com">
                                    <span class="help-block"></span>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="control-label" style="color:red;">Password</label>
                                    <input type="password" class="form-control" id="password" name="password" value="" required="" title="Please enter your password" placeholder="">
                                    <span class="help-block"></span>
                                </div>
                                <div id="loginErrorMsg" class="alert alert-error hide">Wrong username og password</div>
                                <button type="submit" class="btn btn-success btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- end modal -->



</body>
</html>