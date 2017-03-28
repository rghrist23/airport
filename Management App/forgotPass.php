<?php include 'head.html' ?>
<body>
<div class="jumbotron" style="height: 100vh; background-color: gainsboro">
    <div class="container">
    <h4 class="">
        Forgot your password?
    </h4>
    <form accept-charset="UTF-8" action="email.php" role="form" id="login-recordar" method="post">
        <fieldset>
        <span class="help-block">
          Email address you use to log in to your account
          <br>
          We'll send you an email with instructions to choose a new password.
        </span>
            <div class="form-group input-group" style="border: double">
          <span class="input-group-addon">
            @
          </span><input class="form-control" placeholder="Email" name="email" type="email" required="">
            </div>
            <button type="submit" class="btn btn-primary btn-block" name="forgot">
                Continue
            </button>
        </fieldset>
    </form>
    </div>
</div>
</body>
