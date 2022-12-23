angular
	.module('app')
	.controller('UserDetailsCtrl', UserDetailsCtrl)
	.controller('ChangePasswordCtrl', ChangePasswordCtrl);

UserDetailsCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];
ChangePasswordCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];

function UserDetailsCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
	var modal = this;
	modal.edit = false;
	modal.variables = angular.copy(data);
	modal.editMessage = 'Edit Details';

	modal.editCred = function() {
		modal.edit = !modal.edit;
		modal.editMessage = !modal.edit ? 'Edit Details' : 'Cancel Edit';
	};
	modal.save = function() {
		var data = angular.copy(modal.variables);
		data.edit = true;
		AppSvc.save(data).then(function(response) {
			if (response.success) {
				$uibModalInstance.close(modal.variables);
				AppSvc.showAlert('Success', response.message, 'success');
			} else {
				AppSvc.showAlert('Confirmation', 'Nothing Changed. Failed Saving.', 'warning');
			}
		});
	};
	modal.close = function() {
		$uibModalInstance.dismiss('cancel');
	};
}
function ChangePasswordCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
	var modal = this;
	modal.variables = {};
	modal.variables.id = data.id;
	modal.save = function() {
		if (modal.variables.confirm !== modal.variables.new) {
			return AppSvc.showAlert(
				'Confirmation',
				'New Password does not match to Confirm Password. Try Again',
				'warning'
			);
		}
		var data = angular.copy(modal.variables);
		data.changePass = true;
		AppSvc.save(data).then(function(response) {
			if (response.success) {
				$uibModalInstance.close(modal.variables);
				AppSvc.showAlert('Success', response.message, 'success');
			} else {
				AppSvc.showAlert('Confirmation', 'Nothing Changed. Failed Saving.', 'warning');
			}
		});
	};
	modal.close = function() {
		$uibModalInstance.dismiss('cancel');
	};
}
