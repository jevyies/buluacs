<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BCS-SIS</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php  echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link rel="shortcut icon" href="<?php echo base_url('assets/images/bulua.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/bulua.png'); ?>" type="image/x-icon">

    <!-- Custom Fonts -->
    <link href="<?php  echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php  echo base_url('assets/bower_components/angular-loading-bar/src/loading-bar.css'); ?>" rel="stylesheet">

    <link href="<?php  echo base_url('assets/css/app.css'); ?>" rel="stylesheet">
    <link href="<?php  echo base_url('assets/css/animate.css'); ?>" rel="stylesheet">


    
</head>

<body ng-app="app" class="header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
    <ui-view></ui-view>
    <!-- /#wrapper -->
    <input type="hidden" id="base_url" value="<?php echo base_url(); ?>">
    <input type="hidden" id="app_url" value="<?php echo base_url('ngapp/'); ?>">
    <input type="hidden" id="version" value="0.20180421">
    <!-- jQuery -->
    <script src="<?php  echo base_url('assets/theme/vendor/jquery/jquery.min.js'); ?>"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="<?php  echo base_url('assets/theme/vendor/bootstrap/js/bootstrap.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/chart.js/dist/Chart.min.js'); ?>"></script>
    <!-- angular -->
    <script src="<?php  echo base_url('assets/bower_components/angular/angular.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-ui/angular-ui.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-loading-overlay-master/dist/angular-loading-overlay.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/ngMask/dist/ngMask.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-animate/angular-animate.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-chart.js/dist/angular-chart.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-loading-bar/src/loading-bar.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-sanitize/angular-sanitize.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/angular-ui-router/release/angular-ui-router.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/oclazyload/dist/ocLazyLoad.min.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/bower_components/ng-infinite-scroll/build/ng-infinite-scroll.js'); ?>"></script>
    <!-- Canvasjs -->
    <script src="<?php  echo base_url('assets/js/Chart.js'); ?>"></script>
    <script src="<?php  echo base_url('assets/js/angular-chart.min.js'); ?>"></script>
    <!-- app -->
    <script src="<?php  echo base_url('ngapp/app.module.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.routes.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.controller.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/http.service.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/directives.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/right_click.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.service.js'); ?>"></script>



</body>

</html>
