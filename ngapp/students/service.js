(function () {
    'use strict';
    angular
        .module('app')

        .factory('StudSvc', StudSvc)

    StudSvc.$inject = ['baseService'];

    function StudSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/students';
        return service;
    }
})();
