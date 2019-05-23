(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('CardGroupOrderPassengerDetailDialogController', CardGroupOrderPassengerDetailDialogController);

	CardGroupOrderPassengerDetailDialogController.$inject = ['$scope', 'cardService', 'passenger' ,'personalService', 'notificationService'];
	function CardGroupOrderPassengerDetailDialogController($scope, cardService, passenger , personalService, notificationService) {
		var vm = this;
		vm.mode = passenger.id ? 'update' : 'insert';
		vm.savePassengerForm = savePassengerForm;
		vm.emailAvailability = emailAvailability;
		vm.passenger = passenger;
		vm.exist = false;
		vm.emailExist = false;
		activate();

		////////////////

		function activate() {
			personalService.fillScopeBaseData(vm);
		}

		function emailAvailability() {
			cardService.checkEmailAvailability(vm.passenger.email).then(function (result) {
				vm.emailExist = result.data === "true";
				$scope.passengerDetailForm.email.$setValidity('emailExists', !vm.emailExist);
			});
		}

		function savePassengerForm() {
			if ($scope.passengerDetailForm.$invalid) return;

			var method = vm.passenger.id ? 'updateGroupOrderPassenger' : 'insertGroupOrderPassenger';
			cardService[method](vm.passenger).then(function () {
				notificationService.toastSuccess('global.messages.entitySaved', 'global.messages.saving');
				$scope.$close();
			});
		}
	}
})();
