(function () {
    'use strict';
    angular
        .module('app')

        .factory('Form137Svc', Form137Svc);

    Form137Svc.$inject = ['baseService'];

    function Form137Svc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/form_137';
        return service;
    }
})();
