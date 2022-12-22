angular
    .module("app")
    .controller("FormCtrl", FormCtrl)
    .controller("FullPageCtrl", FullPageCtrl)

FormCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector"];
FullPageCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", "data", "$uibModalInstance"];

function FormCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.searchBy = 1;
    $ocLazyLoad.load([
        REPURL + 'service.js?v=' + VERSION,
        ADMINURL + 'service.js?v=' + VERSION
    ]).then(function (d) {
        Form137Svc = $injector.get('Form137Svc');
        AdmSvc = $injector.get('AdmSvc');
        vm.getSubjects();
    })
    vm.getSubjects = function () {
        vm.showLoading = true;
        Form137Svc.get({ subjects: true }).then(function (response) {
            if (!response.message) {
                vm.subjects = response;
            } else {
                vm.subjects = [];
            }
            vm.getSchoolCredentials();
        })
    }
    vm.getSchoolCredentials = function(){
        AdmSvc.get({ SV: true }).then(function (response) {
            if (response.message) {
                vm.schoolCredentials = {};
            } else {
                vm.schoolCredentials = response[0];
            }
            vm.showLoading = false;
        })
    }
    vm.search = function () {
        var data = {};
        if (vm.searchBy == 1) {
            data = { searchLRN: true, LRN: vm.LRN };
        } else if (vm.searchBy == 2) {
            data = { searchID: true, IDNo: vm.IDNo };
        } else {
            data = { searchName: true, FName: vm.FName ? vm.FName : '', LName: vm.LName ? vm.LName : '' };
        }
        vm.showLoading = true;
        Form137Svc.get(data).then(function (response) {
            var sum = 0;
            if (response.message) {
                vm.list = [];
            }
            else {
                sum = response.length;
                response.forEach(function (item) {
                    item.middle = item.middlename.charAt(0).toUpperCase();
                    item.extention = item.extname ? ' ' + item.extname : '';
                })
                vm.list = response;
            }
            if (sum == 0) {
                vm.message = 'No results found';
            } else if (sum == 1) {
                vm.message = sum + ' result found';
            } else {
                vm.message = sum + ' results found';
            }
            vm.showLoading = false;
        })
    }
    vm.clicked = function (x) {
        vm.variables = angular.copy(x)
    }

    vm.generate = function (x) {
        x.subjects = vm.subjects;
        x.schoolCredentials = vm.schoolCredentials;
        var options = {
            data: x,
            templateUrl: REPURL + "full_page_137.html?v=" + VERSION,
            controllerName: "FullPageCtrl",
            controllerAs: 'vm',
            windowClass: 'full-page-card2',
            // viewSize: "md",
            animation: true,
            filesToLoad: [
                REPURL + "full_page_137.html?v=" + VERSION,
                REPURL + "controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options);
    }
}
function FullPageCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var vm = this;
    var filter = $injector.get('$filter');
    var window = $injector.get('$window');
    vm.rotated = true;
    vm.variables = angular.copy(data);
    vm.variables.fullname = data.lastname + ', ' + data.firstname + ' ' + data.middlename.charAt(0).toUpperCase() + '.';
    vm.variables.schoolName = 'Bulua Central School';
    vm.variables.middle = data.middlename.charAt(0).toUpperCase() + '.';
    vm.variables.sexI = data.sex.charAt(0).toUpperCase();
    vm.variables.dob = filter('date')(new Date(data.dob), 'MM/dd/yyyy');
    vm.variables.date_of_entrance = filter('date')(new Date(data.date_of_entrance), 'MM/dd/yyyy');
    vm.variables.guardianDetails = data.guardian + ' ' + data.guardian_address + ' ' + data.guardian_occupation;
    vm.variables.division = data.schoolCredentials.division;
    vm.fullView = true;
    vm.grade1 = filter('filter')(data.subjects, { name: 'Grade 1' }, true);
    vm.grade2 = filter('filter')(data.subjects, { name: 'Grade 2' }, true);
    vm.grade3 = filter('filter')(data.subjects, { name: 'Grade 3' }, true);
    vm.grade4 = filter('filter')(data.subjects, { name: 'Grade 4' }, true);
    vm.grade5 = filter('filter')(data.subjects, { name: 'Grade 5' }, true);
    vm.grade6 = filter('filter')(data.subjects, { name: 'Grade 6' }, true);
    $ocLazyLoad.load([
        REPURL + 'service.js?v=' + VERSION,
    ]).then(function (d) {
        Form137Svc = $injector.get('Form137Svc');
        vm.getGradesOfStudent(vm.variables.student_id);
    })
    vm.getGradesOfStudent = function (id) {
        vm.showLoading = true;
        Form137Svc.get({ id: id, grades: true }).then(function (response) {
            if (response.message) {
                vm.grades = [];
                vm.grade1Subjects = angular.copy(vm.grade1);
                vm.grade2Subjects = angular.copy(vm.grade2);
                vm.grade3Subjects = angular.copy(vm.grade3);
                vm.grade4Subjects = angular.copy(vm.grade4);
                vm.grade5Subjects = angular.copy(vm.grade5);
                vm.grade6Subjects = angular.copy(vm.grade6);
            } else {
                response.forEach(function (item) {
                    if (item.first_grading >= 90) {
                        item.first_value = 'A';
                    } else if (item.first_grading >= 85 && item.first_grading < 90) {
                        item.first_value = 'B';
                    } else if (item.first_grading >= 80 && item.first_grading < 85) {
                        item.first_value = 'C';
                    } else if (item.first_grading >= 75 && item.first_grading < 80) {
                        item.first_value = 'D';
                    } else if (item.first_grading > 1 && item.first_grading < 75) {
                        item.first_value = 'E';
                    } else {
                        item.first_value = '';
                    }
                    if (item.second_grading >= 90) {
                        item.second_value = 'A';
                    } else if (item.second_grading >= 85 && item.second_grading < 90) {
                        item.second_value = 'B';
                    } else if (item.second_grading >= 80 && item.second_grading < 85) {
                        item.second_value = 'C';
                    } else if (item.second_grading >= 75 && item.second_grading < 80) {
                        item.second_value = 'D';
                    } else if (item.second_grading > 1 && item.second_grading < 75) {
                        item.second_value = 'E';
                    } else {
                        item.second_value = '';
                    }
                    if (item.third_grading >= 90) {
                        item.third_value = 'A';
                    } else if (item.third_grading >= 85 && item.third_grading < 90) {
                        item.third_value = 'B';
                    } else if (item.third_grading >= 80 && item.third_grading < 85) {
                        item.third_value = 'C';
                    } else if (item.third_grading >= 75 && item.third_grading < 80) {
                        item.third_value = 'D';
                    } else if (item.third_grading > 1 && item.third_grading < 75) {
                        item.third_value = 'E';
                    } else {
                        item.third_value = '';
                    }
                    if (item.fourth_grading >= 90) {
                        item.fourth_value = 'A';
                    } else if (item.fourth_grading >= 85 && item.fourth_grading < 90) {
                        item.fourth_value = 'B';
                    } else if (item.fourth_grading >= 80 && item.fourth_grading < 85) {
                        item.fourth_value = 'C';
                    } else if (item.fourth_grading >= 75 && item.fourth_grading < 80) {
                        item.fourth_value = 'D';
                    } else if (item.fourth_grading > 1 && item.fourth_grading < 75) {
                        item.fourth_value = 'E';
                    } else {
                        item.fourth_value = '';
                    }
                    if (item.average >= 90) {
                        item.average_value = 'A';
                    } else if (item.average >= 85 && item.average < 90) {
                        item.average_value = 'B';
                    } else if (item.average >= 80 && item.average < 85) {
                        item.average_value = 'C';
                    } else if (item.average >= 75 && item.average < 80) {
                        item.average_value = 'D';
                    } else if (item.average > 1 && item.average < 75) {
                        item.average_value = 'E';
                    } else {
                        item.average_value = '';
                    }
                    item.first_grading = item.first_grading > 0 ? item.first_grading : '';
                    item.second_grading = item.second_grading > 0 ? item.second_grading : '';
                    item.third_grading = item.third_grading > 0 ? item.third_grading : '';
                    item.fourth_grading = item.fourth_grading > 0 ? item.fourth_grading : '';
                    item.average = item.average > 0 ? item.average : '';
                })
                vm.grades = response;
                var grade1 = filter('filter')(vm.grades, { name: 'Grade 1' }, true);
                if (grade1.length > 0) {
                    vm.grade1Average = vm.calculateAverage(grade1);
                }
                var grade2 = filter('filter')(vm.grades, { name: 'Grade 2' }, true);
                if (grade2.length > 0) {
                    vm.grade2Average = vm.calculateAverage(grade2);
                }
                var grade3 = filter('filter')(vm.grades, { name: 'Grade 3' }, true);
                if (grade3.length > 0) {
                    vm.grade3Average = vm.calculateAverage(grade3);
                }
                var grade4 = filter('filter')(vm.grades, { name: 'Grade 4' }, true);
                if (grade4.length > 0) {
                    vm.grade4Average = vm.calculateAverage(grade4);
                }
                var grade5 = filter('filter')(vm.grades, { name: 'Grade 5' }, true);
                if (grade5.length > 0) {
                    vm.grade5Average = vm.calculateAverage(grade5);
                }
                var grade6 = filter('filter')(vm.grades, { name: 'Grade 6' }, true);
                if (grade6.length > 0) {
                    vm.grade6Average = vm.calculateAverage(grade6);
                }
                vm.grade1Subjects = grade1.length > 0 ? grade1 : vm.grade1;
                vm.grade2Subjects = grade2.length > 0 ? grade2 : vm.grade2;
                vm.grade3Subjects = grade3.length > 0 ? grade3 : vm.grade3;
                vm.grade4Subjects = grade4.length > 0 ? grade4 : vm.grade4;
                vm.grade5Subjects = grade5.length > 0 ? grade5 : vm.grade5;
                vm.grade6Subjects = grade6.length > 0 ? grade6 : vm.grade6;
            }
            vm.getHistories(id);
        })
    }
    vm.getHistories = function (id) {
        Form137Svc.get({ id: id, histories: true }).then(function (response) {
            if (response.message) {
                vm.histories = [];
                vm.grade1History = {};
                vm.grade2History = {};
                vm.grade3History = {};
                vm.grade4History = {};
                vm.grade5History = {};
                vm.grade6History = {};
            } else {
                vm.histories = response;
                vm.grade1History = response[0];
                vm.grade2History = response[1];
                vm.grade3History = response[2];
                vm.grade4History = response[3];
                vm.grade5History = response[4];
                vm.grade6History = response[5];
            }
            vm.getCBAs(id)
        })
    }
    vm.getCBAs = function (id) {
        Form137Svc.get({ id: id, CBA: true }).then(function (response) {
            if (response.message) {
                vm.grade1CBA = {};
                vm.grade2CBA = {};
                vm.grade3CBA = {};
                vm.grade4CBA = {};
                vm.grade5CBA = {};
                vm.grade6CBA = {};
            } else {
                response.forEach(function (item) {
                    item.MakaDiyosA1E = vm.equivalents(item.MakaDiyosA1);
                    item.MakaDiyosA2E = vm.equivalents(item.MakaDiyosA2);
                    item.MakaDiyosA3E = vm.equivalents(item.MakaDiyosA3);
                    item.MakaDiyosA4E = vm.equivalents(item.MakaDiyosA4);
                    item.MakaDiyosB1E = vm.equivalents(item.MakaDiyosB1);
                    item.MakaDiyosB2E = vm.equivalents(item.MakaDiyosB2);
                    item.MakaDiyosB3E = vm.equivalents(item.MakaDiyosB3);
                    item.MakaDiyosB4E = vm.equivalents(item.MakaDiyosB4);

                    item.MakaTaoA1E = vm.equivalents(item.MakaTaoA1);
                    item.MakaTaoA2E = vm.equivalents(item.MakaTaoA2);
                    item.MakaTaoA3E = vm.equivalents(item.MakaTaoA3);
                    item.MakaTaoA4E = vm.equivalents(item.MakaTaoA4);
                    item.MakaTaoB1E = vm.equivalents(item.MakaTaoB1);
                    item.MakaTaoB2E = vm.equivalents(item.MakaTaoB2);
                    item.MakaTaoB3E = vm.equivalents(item.MakaTaoB3);
                    item.MakaTaoB4E = vm.equivalents(item.MakaTaoB4);

                    item.Makakalikasan1E = vm.equivalents(item.Makakalikasan1);
                    item.Makakalikasan2E = vm.equivalents(item.Makakalikasan2);
                    item.Makakalikasan3E = vm.equivalents(item.Makakalikasan3);
                    item.Makakalikasan4E = vm.equivalents(item.Makakalikasan4);

                    item.MakaBansaA1E = vm.equivalents(item.MakaBansaA1);
                    item.MakaBansaA2E = vm.equivalents(item.MakaBansaA2);
                    item.MakaBansaA3E = vm.equivalents(item.MakaBansaA3);
                    item.MakaBansaA4E = vm.equivalents(item.MakaBansaA4);
                    item.MakaBansaB1E = vm.equivalents(item.MakaBansaB1);
                    item.MakaBansaB2E = vm.equivalents(item.MakaBansaB2);
                    item.MakaBansaB3E = vm.equivalents(item.MakaBansaB3);
                    item.MakaBansaB4E = vm.equivalents(item.MakaBansaB4);
                })
                vm.grade1CBA = vm.calculateEquivalent(response[0]);
                vm.grade2CBA = vm.calculateEquivalent(response[1]);
                vm.grade3CBA = vm.calculateEquivalent(response[2]);
                vm.grade4CBA = vm.calculateEquivalent(response[3]);
                vm.grade5CBA = vm.calculateEquivalent(response[4]);
                vm.grade6CBA = vm.calculateEquivalent(response[5]);
            }
            vm.getAttendance(id);
        })
    }
    vm.getAttendance = function (id) {
        Form137Svc.get({ id: id, attendance: true }).then(function (response) {
            if (response.message) {
                vm.grade1Attendance = {};
                vm.grade2Attendance = {};
                vm.grade3Attendance = {};
                vm.grade4Attendance = {};
                vm.grade5Attendance = {};
                vm.grade6Attendance = {};
            } else {
                vm.grade1Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 1' }, true));
                vm.grade2Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 2' }, true));
                vm.grade3Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 3' }, true));
                vm.grade4Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 4' }, true));
                vm.grade5Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 5' }, true));
                vm.grade6Attendance = vm.getTotalAttendance(filter('filter')(response, { level_name: 'Grade 6' }, true));

            }
            vm.showLoading = false;
        })
    }
    vm.getTotalAttendance = function (array) {
        if (array.length > 0) {
            var SD = filter('filter')(array, { particulars: 'No. of School days' }, true);
            var SDA = filter('filter')(array, { particulars: 'No. of days absent' }, true);
            var SDP = filter('filter')(array, { particulars: 'No. of days present' }, true);
            return { SD: SD[0].Total, SDA: SDA[0].Total, SDP: SDP[0].Total }
        } else {
            return {};
        }
    }
    vm.calculateEquivalent = function (array) {
        if (array) {
            array.MakaDiyosATotal =
                parseInt(array.MakaDiyosA1) +
                parseInt(array.MakaDiyosA2) +
                parseInt(array.MakaDiyosA3) +
                parseInt(array.MakaDiyosA4)
            array.MakaDiyosATotalE = vm.equivalents(array.MakaDiyosATotal / 4);
            array.MakaDiyosBTotal =
                parseInt(array.MakaDiyosB1) +
                parseInt(array.MakaDiyosB2) +
                parseInt(array.MakaDiyosB3) +
                parseInt(array.MakaDiyosB4)
            array.MakaDiyosBTotalE = vm.equivalents(array.MakaDiyosBTotal / 4);

            array.MakaTaoATotal =
                parseInt(array.MakaTaoA1) +
                parseInt(array.MakaTaoA2) +
                parseInt(array.MakaTaoA3) +
                parseInt(array.MakaTaoA4)
            array.MakaTaoATotalE = vm.equivalents(array.MakaTaoATotal / 4);
            array.MakaTaoBTotal =
                parseInt(array.MakaTaoB1) +
                parseInt(array.MakaTaoB2) +
                parseInt(array.MakaTaoB3) +
                parseInt(array.MakaTaoB4)
            array.MakaTaoBTotalE = vm.equivalents(array.MakaTaoBTotal / 4);

            array.MakakalikasanTotal =
                parseInt(array.Makakalikasan1) +
                parseInt(array.Makakalikasan2) +
                parseInt(array.Makakalikasan3) +
                parseInt(array.Makakalikasan4)
            array.MakakalikasanTotalE = vm.equivalents(array.MakakalikasanTotal / 4)

            array.MakaBansaATotal =
                parseInt(array.MakaBansaA1) +
                parseInt(array.MakaBansaA2) +
                parseInt(array.MakaBansaA3) +
                parseInt(array.MakaBansaA4)
            array.MakaBansaATotalE = vm.equivalents(array.MakaBansaATotal / 4)
            array.MakaBansaBTotal =
                parseInt(array.MakaBansaB1) +
                parseInt(array.MakaBansaB2) +
                parseInt(array.MakaBansaB3) +
                parseInt(array.MakaBansaB4)
            array.MakaBansaBTotalE = vm.equivalents(array.MakaBansaBTotal / 4)
        }
        return array;
    }
    vm.equivalents = function (item) {
        if (Math.round(parseFloat(item)) == 4) {
            return 'AO';
        } else if (Math.round(parseFloat(item)) == 3) {
            return 'SO';
        } else if (Math.round(parseFloat(item)) == 2) {
            return 'RO';
        } else if (Math.round(parseFloat(item)) == 1) {
            return 'SO';
        } else {
            return '';
        }
    }
    vm.calculateAverage = function (array) {
        var first = 0; second = 0; third = 0; fourth = 0; count = 0;
        var firstValue = ''; secondValue = ''; thirdValue = ''; fourthValue = ''; averageValue = '';
        array.forEach(function (item) {
            if(item.is_detail === 'N'){
                sample1 = item.first_grading === '' ? 0 : parseFloat(item.first_grading);
                sample2 = item.second_grading === '' ? 0 : parseFloat(item.second_grading);
                sample3 = item.third_grading === '' ? 0 : parseFloat(item.third_grading);
                sample4 = item.fourth_grading === '' ? 0 : parseFloat(item.fourth_grading);
                first = first + sample1;
                second = second + sample2;
                third = third + sample3;
                fourth = fourth + sample4;
                if (item.first_grading > 0 || item.second_grading > 0 || item.third_grading > 0 || item.fourth_grading > 0) {
                    count++;
                }
            }
        })
        var average = ((first + second + third + fourth) / count)/4;
        if (first / count >= 90) {
            firstValue = 'A';
        } else if (first / count >= 85 && first / count < 90) {
            firstValue = 'B';
        } else if (first / count >= 80 && first / count < 85) {
            firstValue = 'C';
        } else if (first / count >= 75 && first / count < 80) {
            firstValue = 'D';
        } else if (first / count > 1 && first / count < 75) {
            firstValue = 'E';
        } else {
            firstValue = '';
        }
        if (second / count >= 90) {
            secondValue = 'A';
        } else if (second / count >= 85 && second / count < 90) {
            secondValue = 'B';
        } else if (second / count >= 80 && second / count < 85) {
            secondValue = 'C';
        } else if (second / count >= 75 && second / count < 80) {
            secondValue = 'D';
        } else if (second / count > 1 && second / count < 75) {
            secondValue = 'E';
        } else {
            secondValue = '';
        }
        if (third / count >= 90) {
            thirdValue = 'A';
        } else if (third / count >= 85 && third / count < 90) {
            thirdValue = 'B';
        } else if (third / count >= 80 && third / count < 85) {
            thirdValue = 'C';
        } else if (third / count >= 75 && third / count < 80) {
            thirdValue = 'D';
        } else if (third / count > 1 && third / count < 75) {
            thirdValue = 'E';
        } else {
            thirdValue = '';
        }
        if (fourth / count >= 90) {
            fourthValue = 'A';
        } else if (fourth / count >= 85 && fourth / count < 90) {
            fourthValue = 'B';
        } else if (fourth / count >= 80 && fourth / count < 85) {
            fourthValue = 'C';
        } else if (fourth / count >= 75 && fourth / count < 80) {
            fourthValue = 'D';
        } else if (fourth / count > 1 && fourth / count < 75) {
            fourthValue = 'E';
        } else {
            fourthValue = '';
        }
        if (average >= 90) {
            averageValue = 'A';
        } else if (average >= 85 && average < 90) {
            averageValue = 'B';
        } else if (average >= 80 && average < 85) {
            averageValue = 'C';
        } else if (average >= 75 && average < 80) {
            averageValue = 'D';
        } else if (average > 1 && average < 75) {
            averageValue = 'E';
        } else {
            averageValue = '';
        }
        var returnArray = { first: 0, second: 0, third: 0, fourth: 0, FA: 0 };
        returnArray.first = first ? filter('number')(first / count, 2) : '';
        returnArray.second = second ? filter('number')(second / count, 2) : '';
        returnArray.third = third ? filter('number')(third / count, 2) : '';
        returnArray.fourth = fourth ? filter('number')(fourth / count, 2) : '';
        returnArray.FA = filter('number')(average, 2);
        returnArray.firstValue = firstValue;
        returnArray.secondValue = secondValue;
        returnArray.thirdValue = thirdValue;
        returnArray.fourthValue = fourthValue;
        returnArray.FAValue = averageValue;
        return returnArray;
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
        if (vm.flipped) {
            printElement(document.getElementById("printBack"));
        } else {
            printElement(document.getElementById("printFront"));
        }
        setTimeout(
            function () {
                window.print();
            }, 1000);

    }

    vm.close = function () {
        $uibModalInstance.dismiss('cancel')
    }
}