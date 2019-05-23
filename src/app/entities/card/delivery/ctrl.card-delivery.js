(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardDeliveryController', CardDeliveryController);

	CardDeliveryController.$inject = ['cardService', 'notificationService'];
	function CardDeliveryController(cardService, notificationService) {
		var vm = this;
		vm.selectRow = selectRow;
		vm.deliver = deliverCard;
		vm.return = returnCard;
		cardService.fillCardDeliveryListTableParams(vm);

		activate();

		////////////////

		function activate() { }

		function deliverCard(card) {
			showActionDialog('deliver', card);
		}

		function returnCard(card) {
			showActionDialog('return', card);
		}

		function showActionDialog(action, card) {
			notificationService.showModal({
				animation: true,
				controller: 'CardDeliverDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/card/delivery/ctrl.card-delivery-' + action + '-dialog.html',
				size: "md",
				resolve: {
					card: function () {
						return card;
					}
				}
			}).then(function () {
				notificationService.toastSuccess('global.messages.operationDoneSuccessfully', 'card.delivery.' + action + 'Card');
				vm.tableParams.reload();
			});
		}

		function selectRow(row) {
			if (vm.tableParams.selectedRow != row)
				vm.tableParams.selectedRow = row;
			else
				vm.tableParams.selectedRow = null;
		}
	}
})();
