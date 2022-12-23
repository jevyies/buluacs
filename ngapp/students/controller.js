angular.module('app')
    .controller('StudentCtrl', StudentCtrl)
    .controller('FullPageCard', FullPageCard)
    .controller('ExportStudentCtrl', ExportStudentCtrl)

StudentCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];
FullPageCard.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];
ExportStudentCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];

function StudentCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    var filter = $injector.get('$filter');
    vm.variables = {};
    vm.side = 4;
    vm.changeView = 0;
    vm.variables.date_of_entrance = new Date();
    vm.variables.sex = 'Male';
    vm.formName = 'New Student Form';
    vm.boy = 'assets/images/boy.png';
    vm.girl = 'assets/images/girl.png';
    vm.imageSrc = vm.boy;
    vm.coreValues = {};
    vm.lists = [];
    vm.cardList = [];
    vm.attendanceList = [];
    vm.historySide = 'grades';
    $ocLazyLoad.load([
        APPURL + 'app.service.js?v=' + VERSION,
        ADMINURL + 'service.js?v=' + VERSION,
        STUDURL + 'service.js?v=' + VERSION,
        FORMURL + 'service.js?v=' + VERSION,
    ]).then(function (d) {
        AppSvc = $injector.get('AppSvc');
        AdmSvc = $injector.get('AdmSvc');
        StudSvc = $injector.get('StudSvc');
        HistorySvc = $injector.get('HistorySvc');
        vm.getCredentials();
        vm.getStaticVariables();
    })
    vm.getCredentials = function () {
        vm.showLoading = true;
        AppSvc.get().then(function (response) {
            if (response) {
                vm.section = response.record.section;
                vm.grade = response.record.grade;
                vm.teacher = response.record.user;
                vm.getStudents();
            }
        });
    }
    vm.getStudents = function () {
        StudSvc.get({ students: true }).then(function (response) {
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
            vm.showLoading = false;
        })
    }
    vm.nextPage = function () {
        if (!vm.loadingDone || vm.saveFirst) {
            return;
        }
        vm.loadingDone = false;
        var lists = [];
        StudSvc.get({ more: true, number: vm.countStudent }).then(function (response) {
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
    vm.getStaticVariables = function () {
        AdmSvc.get({ SV: true }).then(function (response) {
            if (!response.message) {
                vm.schoolYear = response[0].school_year_from + '-' + response[0].school_year_to;
                vm.principal = response[0].principal_name;
                vm.school_name = response[0].school_name;
            }
        })
    }
    vm.getCardData = function (id) {
        vm.showLoading = true;
        StudSvc.get({ card: true, id: id }).then(function (response) {
            if (response.message) {
                vm.cardList = [];
            } else {
                response.left.forEach(function (item) {
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
                vm.cardList = response.left;
                vm.coreValues = response.right[0];
                vm.attendanceList = response.attendance;
                vm.schoolDays = response.attendance[0];
                vm.schoolPresent = response.attendance[1]; 
                vm.schoolAbsent = response.attendance[2];
                console.log(vm.schoolDays);   
                vm.calculateGeneralAverage();
            }
            vm.showLoading = false;
        })
    }
    vm.saveStudent = function () {
        var data = angular.copy(vm.variables);
        data.middle = vm.variables.middlename.charAt(0).toUpperCase();
        data.extention = vm.variables.extname ? ' ' + vm.variables.extname : '';
        data.dob = AppSvc.getDate(vm.variables.dob);
        data.date_of_entrance = AppSvc.getDate(vm.variables.date_of_entrance);
        data.school_year = vm.schoolYear;
        data.principal = vm.principal;
        data.school_name = vm.school_name;
        data.student = true;
        vm.showLoading = true;
        vm.saveFirst = true;
        if (data.export) {
            delete data.student;
            StudSvc.save(data).then(function (response) {
                if (response.success) {
                    data.history_id = response.history;
                    delete data.export;
                    vm.lists.push(data);
                    vm.clearFunction();
                    AppSvc.showAlert('Success!', response.message, 'success');
                } else {
                    AppSvc.showAlert('Failed Saving!', 'Something went wrong', 'error');
                }
                vm.showLoading = false;
            })
        } else {
            StudSvc.save(data).then(function (response) {
                if (response.success) {
                    if (response.id) {
                        data.student_id = response.id;
                        data.history_id = response.history;
                        vm.lists.push(data);
                    } else {
                        vm.changeView = 0;
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
        }
    }
    vm.clearFunction = function () {
        vm.variables = {}
        vm.variables.date_of_entrance = new Date();
        vm.variables.sex = 'Male';
        vm.variables.grade = vm.grade;
        vm.variables.section = vm.section;
        vm.variables.teacher = vm.teacher;
        vm.variables.schoolYear = vm.schoolYear;
        vm.variables.principal = vm.principal;
        vm.variables.export = false;
    }
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
    vm.changeSex = function () {
        if (vm.variables.sex === 'Male') {
            vm.imageSrc = vm.boy;
        } else {
            vm.imageSrc = vm.girl;
        }
    }
    vm.editInfo = function (row, index) {
        row.checked = !row.checked;
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
    }

    vm.reportCard = function (row) {
        vm.changeView = 2;
        vm.variables = angular.copy(row);
        vm.variables.fullname = row.firstname + ' ' + row.middlename + ' ' + row.lastname + ' ' + row.extention;
        vm.variables.grade = vm.grade;
        vm.variables.section = vm.section;
        vm.variables.teacher = vm.teacher;
        vm.variables.schoolYear = vm.schoolYear;
        vm.variables.principal = vm.principal;
        vm.getCardData(row.history_id);
    }
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
        } else {
            vm.cardList.forEach(function (item) {
                first = first + parseFloat(item.first_grading)
                second = second + parseFloat(item.second_grading);
                third = third + parseFloat(item.third_grading);
                fourth = fourth + parseFloat(item.fourth_grading);
            })
            vm.firstGA = filter('number')(first / vm.cardList.length, 2);
            vm.secondGA = filter('number')(second / vm.cardList.length, 2);
            vm.thirdGA = filter('number')(third / vm.cardList.length, 2);
            vm.fourthGA = filter('number')(fourth / vm.cardList.length, 2);
            var average = ((first + second + third + fourth) / vm.cardList.length) / 4;
            vm.averageGA = filter('number')(average, 2);
            if (average < 75) {
                vm.remarksGA = 'Failed';
            } else if (average >= 75) {
                vm.remarksGA = 'Passed';
            } else {
                vm.remarksGA = '';
            }
        }
    }
    vm.viewFullPage = function () {
        var data = {
            cardList: vm.cardList,
            firstGA: vm.firstGA,
            secondGA: vm.secondGA,
            thirdGA: vm.thirdGA,
            fourthGA: vm.fourthGA,
            averageGA: vm.averageGA,
            remarksGA: vm.remarksGA,
            coreValues: vm.coreValues,
            variables: vm.variables,
            schoolDays: vm.schoolDays,
            schoolPresent: vm.schoolPresent,
            schoolAbsent: vm.schoolAbsent
        }
        var options = {
            data: data,
            templateUrl: STUDURL + "full_page_card.html?v=" + VERSION,
            controllerName: "FullPageCard",
            controllerAs: 'vm',
            windowClass: 'full-page-card',
            animation: true,
            filesToLoad: [
                STUDURL + "full_page_card.html?v=" + VERSION,
                STUDURL + "controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options);
    }
    // vm.calculateDays = function (x) {
    //     var Jun = x.Jun ? parseFloat(x.Jun) : 0;
    //     var Jul = x.Jul ? parseFloat(x.Jul) : 0;
    //     var Aug = x.Aug ? parseFloat(x.Aug) : 0;
    //     var Sep = x.Sep ? parseFloat(x.Sep) : 0;
    //     var Oct = x.Oct ? parseFloat(x.Oct) : 0;
    //     var Nov = x.Nov ? parseFloat(x.Nov) : 0;
    //     var Dec = x.Dec ? parseFloat(x.Dec) : 0;
    //     var Jan = x.Jan ? parseFloat(x.Jan) : 0;
    //     var Feb = x.Feb ? parseFloat(x.Feb) : 0;
    //     var Mar = x.Mar ? parseFloat(x.Mar) : 0;
    //     var total = Jun + Jul + Aug + Sep + Oct + Nov + Dec + Jan + Feb + Mar;
    //     x.Total = total ? total : '';
    // }
    vm.calculateSchoolDays = function(){
        var Jun = vm.schoolDays.Jun ? parseFloat(vm.schoolDays.Jun) : 0;
        var Jul = vm.schoolDays.Jul ? parseFloat(vm.schoolDays.Jul) : 0;
        var Aug = vm.schoolDays.Aug ? parseFloat(vm.schoolDays.Aug) : 0;
        var Sep = vm.schoolDays.Sep ? parseFloat(vm.schoolDays.Sep) : 0;
        var Oct = vm.schoolDays.Oct ? parseFloat(vm.schoolDays.Oct) : 0;
        var Nov = vm.schoolDays.Nov ? parseFloat(vm.schoolDays.Nov) : 0;
        var Dec = vm.schoolDays.Dec ? parseFloat(vm.schoolDays.Dec) : 0;
        var Jan = vm.schoolDays.Jan ? parseFloat(vm.schoolDays.Jan) : 0;
        var Feb = vm.schoolDays.Feb ? parseFloat(vm.schoolDays.Feb) : 0;
        var Mar = vm.schoolDays.Mar ? parseFloat(vm.schoolDays.Mar) : 0;

        var JunAbs = vm.schoolAbsent.Jun ? parseFloat(vm.schoolAbsent.Jun) : 0;
        var JulAbs = vm.schoolAbsent.Jul ? parseFloat(vm.schoolAbsent.Jul) : 0;
        var AugAbs = vm.schoolAbsent.Aug ? parseFloat(vm.schoolAbsent.Aug) : 0;
        var SepAbs = vm.schoolAbsent.Sep ? parseFloat(vm.schoolAbsent.Sep) : 0;
        var OctAbs = vm.schoolAbsent.Oct ? parseFloat(vm.schoolAbsent.Oct) : 0;
        var NovAbs = vm.schoolAbsent.Nov ? parseFloat(vm.schoolAbsent.Nov) : 0;
        var DecAbs = vm.schoolAbsent.Dec ? parseFloat(vm.schoolAbsent.Dec) : 0;
        var JanAbs = vm.schoolAbsent.Jan ? parseFloat(vm.schoolAbsent.Jan) : 0;
        var FebAbs = vm.schoolAbsent.Feb ? parseFloat(vm.schoolAbsent.Feb) : 0;
        var MarAbs = vm.schoolAbsent.Mar ? parseFloat(vm.schoolAbsent.Mar) : 0;

        var total = Jun + Jul + Aug + Sep + Oct + Nov + Dec + Jan + Feb + Mar;
        vm.schoolDays.Total = total ? total : '';

        var JunP = Jun - JunAbs;
        var JulP = Jul - JulAbs;
        var AugP = AugS- AugAbs;
        var SepP = Sep - SepAbs;
        var OctP = Oct - OctAbs;
        var NovP = Nov - NovAbs;
        var DecP = Dec - DecAbs;
        var JanP = Jan - JanAbs;
        var FebP = Feb - FebAbs;
        var MarP = Mar - MarAbs;

        vm.schoolPresent.Jun = JunP ? JunP : '';
        vm.schoolPresent.Jul = JulP ? JulP : '';
        vm.schoolPresent.Aug = AugP ? AugP : '';
        vm.schoolPresent.Sep = SepP ? SepP : '';
        vm.schoolPresent.Oct = OctP ? OctP : '';
        vm.schoolPresent.Nov = NovP ? NovP : '';
        vm.schoolPresent.Dec = DecP ? DecP : '';
        vm.schoolPresent.Jan = JanP ? JanP : '';
        vm.schoolPresent.Feb = FebP ? FebP : '';
        vm.schoolPresent.Mar = MarP ? MarP : '';
        vm.calculatePresents();
    }
    vm.calculatePresents = function(){
        var Jun = vm.schoolPresent.Jun ? parseFloat(vm.schoolPresent.Jun) : 0;
        var Jul = vm.schoolPresent.Jul ? parseFloat(vm.schoolPresent.Jul) : 0;
        var Aug = vm.schoolPresent.Aug ? parseFloat(vm.schoolPresent.Aug) : 0;
        var Sep = vm.schoolPresent.Sep ? parseFloat(vm.schoolPresent.Sep) : 0;
        var Oct = vm.schoolPresent.Oct ? parseFloat(vm.schoolPresent.Oct) : 0;
        var Nov = vm.schoolPresent.Nov ? parseFloat(vm.schoolPresent.Nov) : 0;
        var Dec = vm.schoolPresent.Dec ? parseFloat(vm.schoolPresent.Dec) : 0;
        var Jan = vm.schoolPresent.Jan ? parseFloat(vm.schoolPresent.Jan) : 0;
        var Feb = vm.schoolPresent.Feb ? parseFloat(vm.schoolPresent.Feb) : 0;
        var Mar = vm.schoolPresent.Mar ? parseFloat(vm.schoolPresent.Mar) : 0;
        var total = Jun + Jul + Aug + Sep + Oct + Nov + Dec + Jan + Feb + Mar;
        vm.schoolPresent.Total = total ? total : '';
    }
    vm.calculateAbsents = function(){
        var JunSD = vm.schoolDays.Jun ? parseFloat(vm.schoolDays.Jun) : 0;
        var JulSD = vm.schoolDays.Jul ? parseFloat(vm.schoolDays.Jul) : 0;
        var AugSD = vm.schoolDays.Aug ? parseFloat(vm.schoolDays.Aug) : 0;
        var SepSD = vm.schoolDays.Sep ? parseFloat(vm.schoolDays.Sep) : 0;
        var OctSD = vm.schoolDays.Oct ? parseFloat(vm.schoolDays.Oct) : 0;
        var NovSD = vm.schoolDays.Nov ? parseFloat(vm.schoolDays.Nov) : 0;
        var DecSD = vm.schoolDays.Dec ? parseFloat(vm.schoolDays.Dec) : 0;
        var JanSD = vm.schoolDays.Jan ? parseFloat(vm.schoolDays.Jan) : 0;
        var FebSD = vm.schoolDays.Feb ? parseFloat(vm.schoolDays.Feb) : 0;
        var MarSD = vm.schoolDays.Mar ? parseFloat(vm.schoolDays.Mar) : 0;

        var JunAbs = vm.schoolAbsent.Jun ? parseFloat(vm.schoolAbsent.Jun) : 0;
        var JulAbs = vm.schoolAbsent.Jul ? parseFloat(vm.schoolAbsent.Jul) : 0;
        var AugAbs = vm.schoolAbsent.Aug ? parseFloat(vm.schoolAbsent.Aug) : 0;
        var SepAbs = vm.schoolAbsent.Sep ? parseFloat(vm.schoolAbsent.Sep) : 0;
        var OctAbs = vm.schoolAbsent.Oct ? parseFloat(vm.schoolAbsent.Oct) : 0;
        var NovAbs = vm.schoolAbsent.Nov ? parseFloat(vm.schoolAbsent.Nov) : 0;
        var DecAbs = vm.schoolAbsent.Dec ? parseFloat(vm.schoolAbsent.Dec) : 0;
        var JanAbs = vm.schoolAbsent.Jan ? parseFloat(vm.schoolAbsent.Jan) : 0;
        var FebAbs = vm.schoolAbsent.Feb ? parseFloat(vm.schoolAbsent.Feb) : 0;
        var MarAbs = vm.schoolAbsent.Mar ? parseFloat(vm.schoolAbsent.Mar) : 0;
        var total = JunAbs + JulAbs + AugAbs + SepAbs + OctAbs + NovAbs + DecAbs + JanAbs+ FebAbs + MarAbs;
        vm.schoolAbsent.Total = total ? total : '';

        var JunP = JunSD - JunAbs;
        var JulP = JulSD - JulAbs;
        var AugP = AugSD - AugAbs;
        var SepP = SepSD - SepAbs;
        var OctP = OctSD - OctAbs;
        var NovP = NovSD - NovAbs;
        var DecP = DecSD - DecAbs;
        var JanP = JanSD - JanAbs;
        var FebP = FebSD - FebAbs;
        var MarP = MarSD - MarAbs;

        vm.schoolPresent.Jun = JunP ? JunP : '';
        vm.schoolPresent.Jul = JulP ? JulP : '';
        vm.schoolPresent.Aug = AugP ? AugP : '';
        vm.schoolPresent.Sep = SepP ? SepP : '';
        vm.schoolPresent.Oct = OctP ? OctP : '';
        vm.schoolPresent.Nov = NovP ? NovP : '';
        vm.schoolPresent.Dec = DecP ? DecP : '';
        vm.schoolPresent.Jan = JanP ? JanP : '';
        vm.schoolPresent.Feb = FebP ? FebP : '';
        vm.schoolPresent.Mar = MarP ? MarP : '';
        vm.calculatePresents();
    }
    vm.viewHistory = function (row, index) {
        vm.changeView = 3;
        vm.addStudent = true;
        vm.variables = angular.copy(row);
        vm.getHistory(row.student_id);
    };
    vm.getHistory = function (id) {
        vm.showLoading = true;
        HistorySvc.get({ history: true, id: id }).then(function (response) {
            if (response.message) {
                vm.historyList = [];
                vm.subjectList = [];
                vm.moralList = [];
                vm.attendanceHistoryList = [];
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

                if (response.history.length > 0) {
                    var history = vm.historyList[0];
                    vm.getSubjectGrade(history, 0);
                }
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
    vm.removeStudent = function (id) {
        AppSvc.delete(id).then(function (response) {
            if (response.success) {
                modal.lists.splice(modal.variables.index, 1);
                AppSvc.showAlert('Success!', response.message, 'warning');
            } else {
                AppSvc.showAlert('Error!', response.message, 'error');
            }
        })
    }
    vm.saveCard = function () {
        var data = {};
        if (vm.side == 1) {
            data = { arrayNi: vm.cardList, side: 1 }
        }
        else if (vm.side == 2) {
            vm.coreValues.side = 2;
            data = vm.coreValues;
        }
        else if (vm.side == 3) {
            var attendance = [];
            attendance.push(vm.schoolDays);
            attendance.push(vm.schoolPresent);
            attendance.push(vm.schoolAbsent);
            data = { arrayNi: attendance, side: 3 }
        }
        vm.showLoading = true;
        StudSvc.save(data).then(function (response) {
            if (response.success) {
                StudSvc.showAlert("Success", response.message, "success");
            } else {
                StudSvc.showAlert("Error", response.message, "error");
            }
            vm.showLoading = false;
        });
    }
    vm.cancelView = function () {
        vm.changeView = 0;
        vm.clearFunction();
    }
    function printElement(elem, append, delimiter) {
        var domClone = elem.cloneNode(true);

        var $printSection = document.getElementById("printSection");

        if (!$printSection) {
            var $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }

        if (append !== true) {
            $printSection.innerHTML = "";
        }

        else if (append === true) {
            if (typeof (delimiter) === "string") {
                $printSection.innerHTML += delimiter;
            }
            else if (typeof (delimiter) === "object") {
                $printSection.appendChlid(delimiter);
            }
        }

        $printSection.appendChild(domClone);
    }
    vm.print = function () {
        printElement(document.getElementById("printMe"));
        setTimeout(
            function () {
                window.print();
            }, 1000);

    }
    vm.deleteStudent = function (id, index) {
        var title = 'Deleting this current history of this student. Proceed?'
        AppSvc.confirmation('Are You Sure?', title, 'Proceed', 'Cancel', true).then(function (data) {
            if (data) {
                vm.showLoading = true;
                StudSvc.save({ id: id, delStudent: true }).then(function (response) {
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
    vm.exportStudent = function () {
        var options = {
            data: 'menu',
            templateUrl: STUDURL + 'export_student_list.html?v=' + VERSION,
            controllerName: 'ExportStudentCtrl',
            windowClass: 'export-window',
            filesToLoad: [
                STUDURL + 'export_student_list.html?v=' + VERSION,
                STUDURL + 'controller.js?v=' + VERSION,
            ],
        };
        AppSvc.modal(options).then(function (data) {
            if (data) {
                vm.variables = angular.copy(data);
                vm.variables.dob = new Date(data.dob);
                vm.variables.date_of_entrance = new Date(data.date_of_entrance);
                vm.variables.age = vm.ageCalculator(new Date(data.dob));
                vm.variables.export = true;
                vm.changeSex();
            }
        })
    }
    vm.nextLevel = function () {
        var l = [];
        vm.lists.forEach(function (item) {
            if (item.checked) {
                l.push(item.student_id);
            }
        })
        if (l.length == 0) {
            return AppSvc.showAlert('Confirmation', 'Check one or more student', 'warning');
        }
        var data = { ids: l, nextLvl: true };
        vm.showLoading = true;
        StudSvc.save(data).then(function (response) {
            if (response.success) {
                vm.clearFunction();
                vm.getStudents();
                AppSvc.showAlert('Success!', response.message, 'success');
            } else {
                AppSvc.showAlert('Failed!', 'Something went wrong', 'error');
            }
            vm.showLoading = false;
        })
    }
    vm.rightClickMenu = function () {
        var contextMenuData = [];
        if (!vm.multipleSelection) {
            contextMenuData.push([
                'Multiple Selection',
                function () {
                    vm.multipleSelection = true;
                },
            ]);
        } else {
            contextMenuData.push([
                'Select All',
                function () {
                    vm.lists.forEach(function (item) {
                        item.checked = true;
                    })
                },
            ]);
            contextMenuData.push([
                'Deselect All',
                function () {
                    vm.lists.forEach(function (item) {
                        item.checked = false;
                    })
                },
            ]);
            contextMenuData.push([
                'Cancel Multiple Selection',
                function () {
                    vm.multipleSelection = false;
                },
            ]);
        }
        return contextMenuData;
    }
}
function FullPageCard($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var vm = this;
    var window = $injector.get('$window');
    vm.cardList = angular.copy(data.cardList);
    vm.firstGA = angular.copy(data.firstGA);
    vm.secondGA = angular.copy(data.secondGA);
    vm.thirdGA = angular.copy(data.thirdGA);
    vm.fourthGA = angular.copy(data.fourthGA);
    vm.averageGA = angular.copy(data.averageGA);
    vm.remarksGA = angular.copy(data.remarksGA);
    vm.coreValues = angular.copy(data.coreValues);
    vm.variables = angular.copy(data.variables);
    vm.teacher = angular.copy(data.teacher);
    vm.section = angular.copy(data.section);
    vm.grade = angular.copy(data.grade);
    vm.schoolYear = angular.copy(data.schoolYear);
    vm.schoolDays = angular.copy(data.schoolDays);
    vm.schoolPresent = angular.copy(data.schoolPresent);
    vm.schoolAbsent = angular.copy(data.schoolAbsent);
    vm.fullView = true;

    function printElement(elem, append, delimiter) {
        var domClone = elem.cloneNode(true);

        var $printSection = document.getElementById("printSection");

        if (!$printSection) {
            var $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }

        if (append !== true) {
            $printSection.innerHTML = "";
        }

        else if (append === true) {
            if (typeof (delimiter) === "string") {
                $printSection.innerHTML += delimiter;
            }
            else if (typeof (delimiter) === "object") {
                $printSection.appendChlid(delimiter);
            }
        }

        $printSection.appendChild(domClone);
    }
    vm.print = function () {
        printElement(document.getElementById("printThis"));
        setTimeout(
            function () {
                window.print();
            }, 1000);

    }



    vm.close = function () {
        $uibModalInstance.dismiss('cancel')
    }
}
function ExportStudentCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var modal = this;
    modal.searchBy = 3;
    $ocLazyLoad.load([
        STUDURL + 'service.js?v=' + VERSION,
    ]).then(function (d) {
        StudSvc = $injector.get('StudSvc');
    })
    modal.search = function () {
        var data = {};
        if (modal.searchBy == 1) {
            data = { searchLRN: true, LRN: modal.LRN };
        } else if (modal.searchBy == 2) {
            data = { searchID: true, IDNo: modal.IDNo };
        } else {
            data = { searchName: true, FName: modal.FName ? modal.FName : '', LName: modal.LName ? modal.LName : '' };
        }
        modal.searching = true;
        modal.loading = true;
        StudSvc.get(data).then(function (response) {
            if (response.message) {
                modal.list = [];
            } else {
                response.forEach(function (item) {
                    item.middle = item.middlename.charAt(0).toUpperCase();
                    item.extention = item.extname ? ' ' + item.extname : '';
                })
                modal.list = response;
            }
            if (modal.list.length == 1) {
                modal.resultFound = modal.list.length + ' result found';
            } else if (modal.list.length > 1) {
                modal.resultFound = modal.list.length + ' results found';
            }

            modal.loading = false;
        })
    }

    modal.export = function (row) {
        $uibModalInstance.close(row);
    }
    modal.close = function () {
        $uibModalInstance.dismiss('cancel');
    }
}