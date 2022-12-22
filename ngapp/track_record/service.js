(function () {
    'use strict';
    angular
        .module('app')

        .factory('HistorySvc', HistorySvc);

    HistorySvc.$inject = ['baseService'];

    function HistorySvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/history';
        return service;
    }
})();
