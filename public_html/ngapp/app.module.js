const BASEURL = document.getElementById('base_url').value;
const APPURL = document.getElementById('app_url').value;
const VERSION = document.getElementById('version').value;
const COMURL = APPURL + 'common/';
const DASHBURL = APPURL + 'dashboard/';
const ADMINURL = APPURL + 'administrative/';
const STUDURL = APPURL + 'students/';
const FORMURL = APPURL + 'track_record/';
const REPURL = APPURL + 'form_137/';
const VISURL = APPURL + 'reports/';
const APIURL = '';
const PROJURL = '/buluacs'
// Default colors

angular
	.module('app', [
		'ui.router',
		'oc.lazyLoad',
		'angular-loading-bar',
		'ngSanitize',
		'ngAnimate',
		'ui.bootstrap',
		'chart.js',
		'infinite-scroll',
		'sharedMod',
		'ngMask',
	])
	.config([
		'cfpLoadingBarProvider',
		function (cfpLoadingBarProvider) {
			cfpLoadingBarProvider.includeSpinner = false;
			cfpLoadingBarProvider.latencyThreshold = 1;
		},
	])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		function ($rootScope, $state, $stateParams, bsLoadingOverlayService) {
			$rootScope.$on('$stateChangeSuccess', function () {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			});
			$rootScope.$state = $state;
			// bsLoadingOverlayService.setGlobalConfig({
			// 	templateUrl: COMURL + 'loading/view.html'
			// });
			return ($rootScope.$stateParams = $stateParams);

		},
	])
