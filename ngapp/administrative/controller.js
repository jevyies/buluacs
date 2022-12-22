angular.module('app')
    .controller('AdminCtrl', AdminCtrl)
    .controller('UsersCtrl', UsersCtrl)
    .controller('SubjectsCtrl', SubjectsCtrl)
    .controller('GradesCtrl', GradesCtrl)
    .controller('SubPerGradeCtrl', SubPerGradeCtrl)

AdminCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];
UsersCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];
SubjectsCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];
GradesCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];
SubPerGradeCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];

function AdminCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.list = {};
    $ocLazyLoad.load([ADMINURL + 'service.js?v=' + VERSION]).then(function (d) {
        AdmSvc = $injector.get('AdmSvc');
    });
    vm.getData = function () {
        if (!vm.static) {
            vm.static = true;
            if (!vm.list.var_id) {
                AdmSvc.get({ SV: true }).then(function (response) {
                    if (response.message) {
                        vm.list = {};
                    } else {
                        vm.list = response[0];
                    }
                })
            }
        } else {
            vm.static = false;
        }
    }
    vm.save = function () {
        var data = angular.copy(vm.list);
        AdmSvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    vm.list.var_id = response.id;
                }
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
        })
    }
}
function UsersCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    var filter = $injector.get('$filter');
    vm.userList = [];
    vm.gradeLevels = [];
    vm.variables = {};
    $ocLazyLoad.load([ADMINURL + 'service.js?v=' + VERSION]).then(function (d) {
        AdmSvc = $injector.get('AdmSvc');
        vm.getGradeList();
    });
    vm.getGradeList = function () {
        AdmSvc.get({ grades: true }).then(function (response) {
            if (response.message) {
                vm.gradeLevels = [];
            } else {
                vm.gradeLevels = response;
            }
        })
    }
    vm.getData = function () {
        if (!vm.users) {
            vm.users = true;
            if (vm.userList.length < 1) {
                AdmSvc.get({ users: true }).then(function (response) {
                    if (response.message) {
                        vm.userList = [];
                    } else {
                        vm.userList = response;
                    }
                })
            }
        } else {
            vm.users = false;
        }
    }
    vm.editInfo = function (row, index) {
        vm.showSidePane = true;
        vm.variables = angular.copy(row);
        vm.variables.date_created = new Date(row.date_created);
        vm.variables.index = index;
    }
    vm.save = function () {
        if (!vm.variables.username) {
            vm.variables.username = vm.variables.fname;
        }
        var l = filter('filter')(vm.gradeLevels, { grade_id: vm.variables.grade_id }, true);
        vm.variables.name = l[0].name;
        var data = angular.copy(vm.variables);
        data.fullname = vm.variables.fname + ' ' + vm.variables.lname;
        data.users = true;
        AdmSvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    vm.variables.login_id = response.id;
                    vm.userList.push(vm.variables);
                } else {
                    vm.userList.splice(vm.variables.index, 1, vm.variables);
                }
                vm.focusFirstName = true;
                vm.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
        })
    }
    vm.delete = function (x, index) {
        if (x.user_level === 'Administrator') {
            return AppSvc.showAlert('Warning!', 'Cannot Delete Administrator. Contact Developers for more Info', 'warning');
        }
        var data = ['users', x.login_id];
        AdmSvc.delete(data).then(function (response) {
            if (response.success) {
                vm.userList.splice(index, 1);
                vm.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed!', response.message, 'error');
            }
        })
    }

    vm.clearFunction = function () {
        vm.variables = {};
    }
}
function SubjectsCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.subjectList = [];
    vm.variables = {};
    $ocLazyLoad.load([ADMINURL + 'service.js?v=' + VERSION]).then(function (d) {
        AdmSvc = $injector.get('AdmSvc');
    });
    vm.getData = function () {
        if (!vm.subjects) {
            vm.subjects = true;
            if (vm.subjectList.length < 1) {
                AdmSvc.get({ subjects: true }).then(function (response) {
                    if (response.message) {
                        vm.subjectList = [];
                    } else {
                        vm.subjectList = response;
                    }
                })
            }
        } else {
            vm.subjects = false;
        }
    }
    vm.editInfo = function (row, index) {
        vm.showSidePane = true;
        vm.variables = angular.copy(row);
        vm.variables.index = index;
    }
    vm.save = function () {
        var data = angular.copy(vm.variables);
        data.subjects = true;
        AdmSvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    vm.variables.subject_id = response.id;
                    vm.subjectList.push(vm.variables);
                } else {
                    vm.subjectList.splice(vm.variables.index, 1, vm.variables);
                }
                vm.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
        })
    }
    vm.clearFunction = function () {
        vm.variables = {};
    }
}
function GradesCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.gradeList = [];
    vm.variables = {};
    $ocLazyLoad.load([ADMINURL + 'service.js?v=' + VERSION]).then(function (d) {
        AdmSvc = $injector.get('AdmSvc');
    });
    vm.getData = function () {
        if (!vm.grades) {
            vm.grades = true;
            if (vm.gradeList.length < 1) {
                AdmSvc.get({ grades: true }).then(function (response) {
                    if (response.message) {
                        vm.gradeList = [];
                    } else {
                        response.forEach(function (item) {
                            item.subNo = item.subNo ? item.subNo : '0';
                        })
                        vm.gradeList = response;
                    }
                })
            }
        } else {
            vm.grades = false;
        }
    }

    vm.editInfo = function (row, index) {
        vm.showSidePane = true;
        vm.variables = angular.copy(row);
        vm.variables.index = index;
    }
    vm.save = function () {
        var data = angular.copy(vm.variables);
        data.grades = true;
        AdmSvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    vm.variables.grade_id = response.id;
                    vm.gradeList.push(vm.variables);
                } else {
                    vm.gradeList.splice(vm.variables.index, 1, vm.variables);
                }
                vm.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
        })
    }
    vm.clearFunction = function () {
        vm.variables = {};
    }
    vm.addSubject = function (x) {
        var options = {
            data: x,
            templateUrl: ADMINURL + "subjects_per_grade.html?v=" + VERSION,
            controllerName: "SubPerGradeCtrl",
            controllerAs: 'modal',
            viewSize: 'md',
            animation: true,
            filesToLoad: [
                ADMINURL + "subjects_per_grade.html?v=" + VERSION,
                ADMINURL + "controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options);
    }
}
function SubPerGradeCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var modal = this;
    var filter = $injector.get('$filter');
    modal.titlename = data.name;
    modal.variables = {};
    modal.variables.grade_id = data.grade_id;
    modal.lists = [];
    modal.subjects = [];

    $ocLazyLoad.load([ADMINURL + 'service.js?v=' + VERSION]).then(function (d) {
        AdmSvc = $injector.get('AdmSvc');
        modal.getSubjects();
        modal.getSubjectPerGrade(data.grade_id);
    });
    modal.getSubjects = function () {
        AdmSvc.get({ subjects: true }).then(function (response) {
            if (response.message) {
                modal.subjects = [];
            } else {
                modal.subjects = response;
            }
        })
    }
    modal.getSubjectPerGrade = function (id) {
        AdmSvc.get({ subjectsPerGrade: true, id: id }).then(function (response) {
            if (response.message) {
                modal.lists = [];
            } else {
                modal.lists = response;
            }
        })
    }
    modal.save = function () {
        var l = filter('filter')(modal.subjects, { subject_id: modal.variables.subject_id }, true);
        modal.variables.subject_name = l[0].subject_name;
        var data = angular.copy(modal.variables);
        data.subjectsPerGrade = true;
        AdmSvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    modal.variables.x_id = response.id;
                    modal.lists.push(modal.variables);
                } else {
                    modal.lists.splice(modal.variables.index, 1, modal.variables);
                }
                modal.clearFunction();
                // AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
        })
    }
    modal.delete = function () {
        var data = ['grade_per_subject', modal.variables.x_id];
        AdmSvc.delete(data).then(function (response) {
            if (response.success) {
                modal.lists.splice(modal.variables.index, 1);
                modal.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed!', response.message, 'error');
            }
        })
    }
    modal.getDetails = function (x, index) {
        modal.variables = angular.copy(x);
        modal.variables.index = index;
    }
    modal.clearFunction = function () {
        modal.variables = {};
        modal.variables.grade_id = data.grade_id;
    }
    modal.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
}