(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('TabCardGroupOrderPassengersInfoController', TabCardGroupOrderPassengersInfoController);

	TabCardGroupOrderPassengersInfoController.$inject = ['$scope', 'cardService', 'notificationService'];
	function TabCardGroupOrderPassengersInfoController($scope, cardService, notificationService) {
		var cvm = this,
			 vm = $scope.$parent.$parent.vm;
		cardService.fillCardGroupOrderPassengersListTableParams(cvm, vm.order.customers);
		cvm.insertPassenger = insertPassenger;
		cvm.updatePassenger = updatePassenger;
		cvm.deletePassenger = deletePassenger;
		activate();

		////////////////

		function activate() { }

		function insertPassenger(groupOrderId) {
			showPassengerModal(function () {
				return {
					orderGroup: groupOrderId,
					passportScan: [],
					visaScan: [],
					email: null
				}
			})
		}

		function updatePassenger(passenger) {
			showPassengerModal(function () {
				return nwmapper.map('PassengerDetailDto','PassengerDetailVM', passenger)
			});
		}

		function deletePassenger(passenger) {
			notificationService.confirm('global.messages.deleting', "global.messages.deleteConfirm", 'global.messages.yes', 'global.messages.no').then(function () {
				cardService.deleteGroupOrderPassenger(passenger.id).then(function () {
					notificationService.toastSuccess('global.messages.entityDeleted', 'global.messages.deleting');
					reloadPassengers();
				});
			});
		}

		function showPassengerModal(passengerFn) {
			return notificationService.showModal({
				animation: true,
				controller: 'CardGroupOrderPassengerDetailDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/card/order/ctrl.card-group-order-passenger-detail-dialog.html',
				size: "lg",
				resolve: {
					passenger: passengerFn
				}
			}).then(function () {
				reloadPassengers();
			});
		}

		function reloadPassengers() {
			cardService.getGroupOrderById(vm.order.id).then(function (gorder) {
				cvm.tableParams.settings({
					dataset: gorder.customers
				});
			});
		}
	}
})();
