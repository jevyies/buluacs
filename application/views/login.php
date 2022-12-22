<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Bulua Central System</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/style.css'); ?>" rel="stylesheet">
    <link rel="shortcut icon" href="<?php echo base_url('assets/images/bulua.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/bulua.png'); ?>" type="image/x-icon">
    <link href="<?php echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">
</head>

<body class="login-page">
    <div class="wrapper">
        <div id="text-content">
            <div class="school-logo">
                <img class="logo-pic" src="<?php echo base_url('assets/images/bulua.png'); ?>" id="logo" alt="School Icon" />
                <br>
                <span class="since">Since 1941</span>
            </div>
            <div class="school-text">
                <span class="big-letter">BCS</span>
                <span class="big-letter">Student</span>
                <span class="big-letter">Information</span>
                <span class="big-letter">System</span>
            </div>
            <div class="caption-text">
                <span>Presented by:</span>
                <br>
                <span>Luremy Abenio</span>
            </div>
        </div>
        <div class="form-content">
            <div id="formContent">
                <h2>Login Form</h2>
                <div>
                    <img src="<?php echo base_url('assets/images/login-icon.png'); ?>" id="icon" alt="User Icon" />
                </div>
                <form role="form" method="post" action="<?php echo base_url('login'); ?>">
                    <div class="form-group error error-text text-center">
                        <i><?php echo @$message; ?></i>
                    </div>
                    <input type="text" id="login"  name="username" placeholder="username" autofocus>
                    <input type="password" id="password" name="password" placeholder="password">
                    <input type="submit" value="Log In">
                </form>
            </div>
        </div>
        <div class="footer">
            <div class="footer-wrapper">
                <div class="logo-footer">
                    <img class="logo-pic" src="<?php echo base_url('assets/images/bulua.png'); ?>" id="logo" alt="School Icon" />
                </div>
                <div class="text-footer">
                    <span class="footer-text-size">BCS Student Information System</span>
                    <br>
                    <span>Presented By: Luremy Abenio</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
