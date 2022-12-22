angular
    .module("app")
    .controller("ReportsCtrl", ReportsCtrl);

ReportsCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector"];

function ReportsCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.teacherClick = false;
    vm.studentClick = false;
    vm.changeView = 0;
    vm.section = "";
    vm.teacherList = [];
    vm.year = (new Date().getFullYear() - 1) + "-" + new Date().getFullYear();
    $ocLazyLoad.load([
        VISURL + 'service.js?v=' + VERSION,
        ADMINURL + 'service.js?v=' + VERSION
    ]).then(function (d) {
        RepSvc = $injector.get('RepSvc');
        AdmSvc = $injector.get('AdmSvc');
    })

    vm.clickAccordion = function (button) {
        if (button == 'student') {
            if (vm.studentClick) {
                vm.studentClick = false;
            } else {
                vm.getTeachers();
                vm.studentClick = true;
                vm.teacherClick = false;
            }
        } else {
            if (vm.teacherClick) {
                vm.teacherClick = false;
            } else {
                vm.studentClick = false;
                vm.teacherClick = true;
            }
        }
    }

    vm.clickButton = function (type) {
        if (type == 'byTeacher') {
            vm.changeView = 1;
        }
    }

    vm.getTeachers = function () {
        AdmSvc.get({ users: true }).then(function (response) {
            if (response.message) {
                vm.teacherList = [];
            } else {
                vm.teacherList = response;
            }
        })
    }
}