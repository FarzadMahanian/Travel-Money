(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardGroupOrderListController', CardGroupOrderListController);

	CardGroupOrderListController.$inject = ['cardService', 'notificationService', 'locationService'];

	function CardGroupOrderListController(cardService, notificationService, locationService) {
		var vm = this;
		vm.showPassengersDetail = showPassengersDetail;
		vm.editGroupOrder = editGroupOrder;
		vm.deleteGroupOrder = deleteGroupOrder;
		cardService.fillCardGroupOrderListTableParams(vm);

		activate();

		////////////////

		function activate() {

		}

		function deleteGroupOrder(groupOrder) {
			notificationService.confirm('global.messages.deleting', "global.messages.deleteConfirm", 'global.messages.yes', 'global.messages.no').then(function () {
				cardService.deleteGroupOrder(groupOrder.id).then(function () {
					notificationService.toastSuccess('global.messages.entityDeleted', 'global.messages.deleting');
					vm.tableParams.reload();
				});
			});
		}

		function editGroupOrder(groupOrder) {
			locationService.go('app.card.groupOrder', {
				id: groupOrder.id
			});
		}

		function showPassengersDetail(order) {
			notificationService.showModal({
				animation: true,
				controller: 'CardGroupOrderPassengersDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/card/order/ctrl.card-group-order-passengers-dialog.html',
				size: "lg",
				resolve: {
					groupOrder: function () {
						return order;
					}
				}
			});
		}
	}
})();
