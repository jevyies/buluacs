(function () {
    'use strict';
    angular
        .module('app')

        .factory('AdmSvc', AdmSvc);

    AdmSvc.$inject = ['baseService', '$uibModal', '$ocLazyLoad'];

    function AdmSvc(baseService, $uibModal, $ocLazyLoad) {
        var service = new baseService();
        service.url = APIURL + 'api/administrative';
        return service;
    }
})();
