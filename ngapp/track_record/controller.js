angular
    .module("app")
    .controller("HistoryCtrl", HistoryCtrl)
    .controller("AddFormCtrl", AddFormCtrl);

HistoryCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", "$window"];
AddFormCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", "data", "$uibModalInstance"];

function HistoryCtrl($scope, $ocLazyLoad, $injector, $window) {
    var vm = this;
    var filter = $injector.get('$filter');
    vm.changeView = 0;
    vm.variables = {};
    vm.variables.date_of_entrance = new Date();
    vm.variables.sex = "Male";
    vm.formName = "New Student Form";
    vm.boy = "assets/images/boy.png";
    vm.girl = "assets/images/girl.png";
    vm.imageSrc = vm.boy;
    vm.allStudent = true;
    vm.lists = [];
    vm.historyList = [];
    vm.historySide = 'grades';
    $ocLazyLoad.load([
        FORMURL + 'service.js?v=' + VERSION,
        ADMINURL + 'service.js?v=' + VERSION,
        STUDURL + 'service.js?v=' + VERSION,
    ]).then(function (d) {
        HistorySvc = $injector.get('HistorySvc');
        AdmSvc = $injector.get('AdmSvc');
        StudSvc = $injector.get('StudSvc');
        vm.getStudents();
    })
    vm.getData = function () {
        AdmSvc.get({ grades: true }).then(function (response) {
            if (response.message) {
                vm.gradeList = [];
            } else {
                vm.gradeList = response;
            }
            vm.getTeachers();
        });
    };
    vm.getTeachers = function () {
        AdmSvc.get({ users: true }).then(function (response) {
            if (response.message) {
                vm.userList = [];
            } else {
                vm.userList = response;
            }
            vm.showLoading = false;
        })
    }
    vm.getStudents = function () {
        vm.showLoading = true;
        HistorySvc.get({ students: true }).then(function (response) {
            if (response.message) {
                vm.lists = [];
            } else {
                response.forEach(function (item) {
                    item.age = vm.ageCalculator(new Date(item.dob));
                    item.middle = item.middlename.charAt(0).toUpperCase();
                    item.extention = item.extname ? ' ' + item.extname : '';
                })
                vm.lists = response;
            }
            vm.countStudent = vm.lists.length;
            vm.loadingDone = true;
            vm.getSchoolCredentials()
            vm.showLoading = false;
        })
    }
    vm.nextPage = function () {
        if (!vm.loadingDone || vm.saveFirst) {
            return;
        }
        vm.loadingDone = false;
        var lists = [];
        HistorySvc.get({ more: true, number: vm.countStudent }).then(function (response) {
            if (response.message) {
                vm.loadingDone = false;
                vm.stopLoading = true;
            } else {
                response.forEach(function (item) {
                    item.age = vm.ageCalculator(new Date(item.dob));
                    item.middle = item.middlename.charAt(0).toUpperCase();
                    item.extention = item.extname ? ' ' + item.extname : '';
                    vm.lists.push(item);
                    vm.loadingDone = true;
                })
            }
            vm.countStudent = vm.lists.length;
        })
    }
    vm.getSchoolCredentials = function () {
        AdmSvc.get({ SV: true }).then(function (response) {
            if (!response.message) {
                vm.schoolName = response[0].school_name;
                vm.principalName = response[0].principal_name;
                vm.schoolYear = response[0].school_year_from + '-' + response[0].school_year_to;
            }
            vm.getData();
        })
    }
    vm.getHistory = function (id, number) {
        vm.showLoading = true;
        HistorySvc.get({ history: true, id: id }).then(function (response) {
            if (response.history.length == 0) {
                vm.filteredSubjects = [];
                vm.historyList = [];
            } else {
                response.subjects.forEach(function (item) {
                    item.first_grading = item.first_grading == 0 ? '' : item.first_grading;
                    item.second_grading = item.second_grading == 0 ? '' : item.second_grading;
                    item.third_grading = item.third_grading == 0 ? '' : item.third_grading;
                    item.fourth_grading = item.fourth_grading == 0 ? '' : item.fourth_grading;
                    item.average = item.average == 0 ? '' : item.average;
                })
                response.attendance.forEach(function (item) {
                    item.Jun = item.Jun == 0 ? '' : item.Jun;
                    item.Jul = item.Jul == 0 ? '' : item.Jul;
                    item.Aug = item.Aug == 0 ? '' : item.Aug;
                    item.Sep = item.Sep == 0 ? '' : item.Sep;
                    item.Oct = item.Oct == 0 ? '' : item.Oct;
                    item.Nov = item.Nov == 0 ? '' : item.Nov;
                    item.Dec = item.Dec == 0 ? '' : item.Dec;
                    item.Jan = item.Jan == 0 ? '' : item.Jan;
                    item.Feb = item.Feb == 0 ? '' : item.Feb;
                    item.Mar = item.Mar == 0 ? '' : item.Mar;
                    item.Total = item.Total == 0 ? '' : item.Total;
                })
                vm.historyList = response.history;
                vm.subjectList = response.subjects;
                vm.moralList = response.moral;
                vm.attendanceHistoryList = response.attendance;
                var history = vm.historyList[number];
                vm.getSubjectGrade(history, number);
            }
            vm.showLoading = false;
        })
    }
    vm.getSubjectGrade = function (x, i) {
        vm.history_id = x.history_id;
        vm.filteredSubjects = filter('filter')(vm.subjectList, { history_id: x.history_id }, true);
        vm.filteredAttendance = filter('filter')(vm.attendanceHistoryList, { history_id: x.history_id }, true);
        var filteredMoral = filter('filter')(vm.moralList, { history_id: x.history_id }, true);
        vm.moralHistory = filteredMoral[0];
        vm.calculateGeneralAverage('history');
    }
    vm.changeSex = function () {
        if (vm.variables.sex === "Male") {
            vm.imageSrc = vm.boy;
        } else {
            vm.imageSrc = vm.girl;
        }
    };
    vm.viewHistory = function (row, index) {
        vm.changeView = 3;
        vm.addStudent = true;
        vm.variables = angular.copy(row);
        vm.getHistory(row.student_id, 0);
    };
    vm.TabViewClick = function (number) {
        vm.TabView = number;
    };
    vm.openAddForm = function (row, index) {
        vm.variables.school_name = vm.schoolName;
        vm.variables.school_year = vm.schoolYear;
        vm.variables.principal = vm.principalName;
        var data = { variables: vm.variables, history: vm.historyList, gradeList: vm.gradeList, userList: vm.userList };
        if (row) {
            data = { variables: vm.variables, history: vm.historyList, data: row, gradeList: vm.gradeList, userList: vm.userList };
        }
        var options = {
            data: data,
            templateUrl: FORMURL + "add_history.html?v=" + VERSION,
            controllerName: "AddFormCtrl",
            viewSize: "md",
            filesToLoad: [FORMURL + "controller.js?v=" + VERSION]
        };
        AppSvc.modal(options).then(function (data) {
            if (data) {
                if (!row) {
                    vm.historyList.push(data);
                    var number = vm.historyList.length - 1;
                    vm.getHistory(vm.variables.student_id, number);
                } else {
                    vm.historyList.splice(index, 1, data);
                }
            }
        });
    };
    vm.editInfo = function (row, index) {
        vm.changeView = 1;
        vm.addStudent = true;
        if (row.firstname) {
            vm.variables = angular.copy(row);
            vm.variables.index = index;
            vm.variables.dob = new Date(row.dob);
            vm.variables.date_of_entrance = new Date(row.date_of_entrance);
            vm.formName = 'Edit Student Information';
            vm.changeSex();
        } else {
            vm.clearFunction();
            vm.formName = 'New Student Form';
        }
    };
    vm.calculateAverage = function (x, type) {
        if (x.first_grading && x.second_grading && x.third_grading && x.fourth_grading) {
            x.average = (parseFloat(x.first_grading) + parseFloat(x.second_grading) + parseFloat(x.third_grading) + parseFloat(x.fourth_grading)) / 4
            if (x.average <= 75) {
                x.remarks = 'Failed';
            } else {
                x.remarks = 'Passed';
            }
        } else {
            x.average = '';
            x.remarks = '';
        }
        vm.calculateGeneralAverage(type);
    }
    vm.calculateGeneralAverage = function (type) {
        var first = 0;
        var second = 0;
        var third = 0;
        var fourth = 0;
        if (type === 'history') {
            vm.filteredSubjects.forEach(function (item) {
                first = first + parseFloat(item.first_grading)
                second = second + parseFloat(item.second_grading);
                third = third + parseFloat(item.third_grading);
                fourth = fourth + parseFloat(item.fourth_grading);
            })
            vm.firstGAH = filter('number')(first / vm.filteredSubjects.length, 2);
            vm.secondGAH = filter('number')(second / vm.filteredSubjects.length, 2);
            vm.thirdGAH = filter('number')(third / vm.filteredSubjects.length, 2);
            vm.fourthGAH = filter('number')(fourth / vm.filteredSubjects.length, 2);
            var average = ((first + second + third + fourth) / vm.filteredSubjects.length) / 4;
            vm.averageGAH = filter('number')(average, 2);
            if (average < 75) {
                vm.remarksGAH = 'Failed';
            } else if (average >= 75) {
                vm.remarksGAH = 'Passed';
            } else {
                vm.remarksGA = '';
            }
        }
    }
    vm.saveStudent = function () {
        var data = angular.copy(vm.variables);
        data.middle = vm.variables.middlename.charAt(0).toUpperCase();
        data.extention = vm.variables.extname ? ' ' + vm.variables.extname : '';
        data.dob = AppSvc.getDate(vm.variables.dob);
        data.date_of_entrance = AppSvc.getDate(vm.variables.date_of_entrance);
        data.school_year = vm.schoolYear;
        data.principal = vm.principal;
        data.student = true;
        vm.showLoading = true;
        vm.saveFirst = true;
        HistorySvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    data.student_id = response.id;
                    vm.lists.push(data);
                } else {
                    vm.lists.splice(vm.variables.index, 1, data);
                }
                vm.clearFunction();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                if(response.exist){
                    AppSvc.showAlert('Ooops!', response.message, 'warning');
                }else{
                    AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
                }
            }
            vm.showLoading = false;
        })
    };
    vm.clearFunction = function () {
        vm.variables = {}
        vm.variables.date_of_entrance = new Date();
        vm.variables.sex = 'Male';
        vm.variables.grade = vm.grade;
        vm.variables.section = vm.section;
        vm.variables.schoolYear = vm.schoolYear;
        vm.variables.principal = vm.principal;
    };
    vm.ageCalculator = function (mdate) {
        if (mdate) {
            var yearThen = mdate.getFullYear();
            var monthThen = mdate.getMonth();
            var dayThen = mdate.getDate();

            var today = new Date();
            var birthday = new Date(yearThen, monthThen - 1, dayThen);

            var differenceInMilisecond = today.valueOf() - birthday.valueOf();

            var year_age = Math.floor(differenceInMilisecond / 31536000000);
            vm.variables.age = year_age;
        } else {
            vm.variables.age = 0;
        }
        return vm.variables.age;
    };
    vm.cancelView = function () {
        vm.changeView = 0;
        vm.clearFunction();
    }
    vm.deleteHistory = function (x, i) {
        var title = 'Deleting ' + x.level_name + ' data will result to data loss. Proceed?'
        AppSvc.confirmation('Are You Sure?', title, 'Proceed', 'Cancel', true).then(function (data) {
            if (data) {
                HistorySvc.save({ id: x.history_id, delHis: true }).then(function (response) {
                    if (response.success) {
                        vm.historyList.splice(i, 1);
                        vm.getHistory(vm.variables.student_id, 0);
                        AppSvc.showAlert('Success', response.message, 'success');
                    } else {
                        AppSvc.showAlert('Error', response.message, 'error');
                    }
                })
            }
        })
    }
    vm.saveCard = function () {
        var data = {};
        if (vm.historySide === 'grades') {
            data = { arrayNi: vm.filteredSubjects, side: 1 }
        }
        else if (vm.historySide === 'moral') {
            vm.moralHistory.side = 2;
            data = vm.moralHistory;
        }
        else if (vm.historySide === 'attendance') {
            data = { arrayNi: vm.filteredAttendance, side: 3 }
        }
        vm.showLoading = true;
        StudSvc.save(data).then(function (response) {
            if (response.success) {
                AppSvc.showAlert("Success", response.message, "success");
            } else {
                AppSvc.showAlert("Error", response.message, "error");
            }
            vm.showLoading = false;
        });
    }
    vm.calculateDays = function (x) {
        var Jun = x.Jun ? parseFloat(x.Jun) : 0;
        var Jul = x.Jul ? parseFloat(x.Jul) : 0;
        var Aug = x.Aug ? parseFloat(x.Aug) : 0;
        var Sep = x.Sep ? parseFloat(x.Sep) : 0;
        var Oct = x.Oct ? parseFloat(x.Oct) : 0;
        var Nov = x.Nov ? parseFloat(x.Nov) : 0;
        var Dec = x.Dec ? parseFloat(x.Dec) : 0;
        var Jan = x.Jan ? parseFloat(x.Jan) : 0;
        var Feb = x.Feb ? parseFloat(x.Feb) : 0;
        var Mar = x.Mar ? parseFloat(x.Mar) : 0;
        var total = Jun + Jul + Aug + Sep + Oct + Nov + Dec + Jan + Feb + Mar;
        x.Total = total ? total : '';
    }
    vm.deleteStudent = function (id, index) {
        var title = 'Deleting all the information of this student. Proceed?'
        AppSvc.confirmation('Are You Sure?', title, 'Proceed', 'Cancel', true).then(function (data) {
            if (data) {
                vm.showLoading = true;
                HistorySvc.save({ id: id, delStudent: true }).then(function (response) {
                    if (response.success) {
                        vm.lists.splice(index, 1);
                        vm.clearFunction();
                        AppSvc.showAlert('Success', response.message, 'success');
                    } else {
                        AppSvc.showAlert('Error', response.message, 'error');
                    }
                    vm.showLoading = false;
                })
            }
        })
    }
    vm.rightClickMenu = function(){
        var contextMenuData = [];
		return contextMenuData;
    }
}

function AddFormCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var modal = this;
    var filter = $injector.get('$filter');
    modal.changeView = 0;
    modal.variables = {};
    modal.history = angular.copy(data.history);
    modal.gradeList = angular.copy(data.gradeList);
    modal.userList = angular.copy(data.userList);
    $ocLazyLoad.load([
        FORMURL + 'service.js?v=' + VERSION,
    ]).then(function (d) {
        HistorySvc = $injector.get('HistorySvc');
        if (data.data) {
            modal.variables = angular.copy(data.data);
            modal.changeGrade(data.data.grade);
            var l = filter('filter')(modal.userList, { fullname: data.data.teacher_name }, true);
            if(l.length > 0){
                modal.variables.teacher = l[0].login_id;
            }
        } else {
            modal.variables.student_id = data.variables.student_id;
            modal.variables.sex = data.variables.sex;
            modal.variables.age = data.variables.age.toString();
            modal.variables.school_name = data.variables.school_name;
            modal.variables.school_year = data.variables.school_year;
            modal.variables.principal = data.variables.principal;
            modal.variables.status = 'PREVIOUS';
        }
    })
    modal.changeGrade = function (grade) {
        if (grade) {
            modal.filteredUser = filter('filter')(modal.userList, { grade_id: grade }, true);
        }
    }
    modal.getSection = function (id) {
        if (id) {
            var l = filter('filter')(modal.userList, { login_id: id }, true);
            modal.variables.teacher_name = l[0].fullname;
            modal.variables.section_name = l[0].section_name;
        }
    }
    modal.save = function () {
        var exist = false;
        if (modal.history.length > 0 && !modal.variables.history_id) {
            modal.history.forEach(function (item) {
                if (modal.variables.grade == item.grade) {
                    exist = true;
                }
            })
        }
        if (exist) {
            return AppSvc.showAlert('Confirmation!', 'This grade already exist in this student.', 'warning');
        }
        var l = filter('filter')(modal.gradeList, { grade_id: modal.variables.grade }, true);
        var data = angular.copy(modal.variables);
        data.level_name = l[0].name;
        data.history = true;
        modal.showLoading = true;
        HistorySvc.save(data).then(function (response) {
            if (response.success) {
                if (response.id) {
                    data.history_id = response.id;
                }
                AppSvc.showAlert('Success!', response.message, 'success');
                $uibModalInstance.close(data);
            } else {
                AppSvc.showAlert('Failed Saving!', 'Nothing changes happen', 'warning');
            }
            modal.showLoading = false;
        })
    };
    modal.close = function () {
        $uibModalInstance.dismiss();
    };
}
