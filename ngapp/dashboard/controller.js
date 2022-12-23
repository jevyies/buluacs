//main.js
angular.module('app').controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];

function DashboardCtrl($scope, $ocLazyLoad, $injector) {
	var vm = this;
	vm.date = new Date();
	vm.chart1 = {};
	vm.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
    vm.series = ['Series A', 'Series B'];
 
    vm.data = [
      [75, 63, 59, 79, 13, 91, 113],
      [27, 48, 54, 70, 89, 35, 53]
    ];
 
    vm.ColorBar = ['#90EE90', '#FF6600'];    
    vm.DataSetOverride = [{ yAxisID: 'y-axis-1' }]; //y-axis-1 is the ID defined in scales under options.
 
    vm.options = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
        }
    }
 
    vm.clickme = function($event){
        alert("You've clicked upon "+$event[0]._view.label);
    }
 
    vm.hoverme = function ($event) {
        alert("You hovered over " + $event[0]._view.label);
    }

	$ocLazyLoad
		.load([
			DASHBURL + "service.js?v=" + VERSION,
		])
		.then(function (d) {
			// DashboardSvc = $injector.get("DashboardSvc");
		});
}