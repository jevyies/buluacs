angular.module('app').config([
	'$stateProvider',
	'$urlRouterProvider',
	'$ocLazyLoadProvider',
	function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		$urlRouterProvider.otherwise('/my-students');

		$ocLazyLoadProvider.config({
			debug: false,
		});
		$stateProvider
			.state('app', {
				abstract: true,
				templateUrl: COMURL + 'full.html?v=' + VERSION,
			})
			.state('app.main', {
				url: '/',
				templateUrl: APPURL + 'dashboard/view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
							});
						},
					],
				},
			})
			.state('app.administrative', {
				url: '/administrative',
				templateUrl: ADMINURL + 'view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [ADMINURL + 'controller.js?v=' + VERSION],
							});
						},
					],
				},
			})
			.state('app.students', {
				url: '/my-students',
				templateUrl: STUDURL + 'view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [
									STUDURL + 'controller.js?v=' + VERSION,
									STUDURL + 'student.css?v=' + VERSION
								],
							});
						},
					],
				},
			})
			.state('app.history', {
				url: '/history',
				templateUrl: FORMURL + 'view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [
									FORMURL + 'controller.js?v=' + VERSION,
									STUDURL + 'student.css?v=' + VERSION
								],
							});
						},
					],
				},
			})
			.state('app.form', {
				url: '/form-137',
				templateUrl: REPURL + 'view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [
									REPURL + 'controller.js?v=' + VERSION,
									STUDURL + 'student.css?v=' + VERSION
								],
							});
						},
					],
				},
			})
			.state('app.reports', {
				url: '/reports',
				templateUrl: VISURL + 'view.html?v=' + VERSION,
				resolve: {
					loadMyCtrl: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								files: [
									VISURL + 'controller.js?v=' + VERSION,
									STUDURL + 'student.css?v=' + VERSION
								],
							});
						},
					],
				},
			});
	},
]);
