(function() {
	'use strict';
	angular
		.module('app')

		.factory('DashboardSvc', DashboardSvc);

	DashboardSvc.$inject = ['baseService'];

	function DashboardSvc(baseService) {
		var service = new baseService();
		// service.url = BASE_URL + 'api/budgets';
		return service;
	}
})();
