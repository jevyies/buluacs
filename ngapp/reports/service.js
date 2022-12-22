(function () {
    'use strict';
    angular
        .module('app')

        .factory('RepSvc', RepSvc);

    RepSvc.$inject = ['baseService'];

    function RepSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/reports';
        return service;
    }
})();
