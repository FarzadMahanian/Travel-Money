(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('BankOrderListController', BankOrderListController);

	BankOrderListController.$inject = ['notificationService', 'bankService', 'filterService', 'constants'];
	function BankOrderListController(notificationService, bankService, filterService, constants) {
		var vm = this;
		bankService.fillCardOrderListTableParams(vm);
		vm.selectRow = selectRow;
		vm.issueCard = issueCard;
		vm.cancelCard = cancelCard;
		vm.rejectCard = rejectCard;
		vm.showDetail = showDetail;
		activate();

		////////////////

		function activate() { }

		function showDetail(order) {
			notificationService.showModal({
				animation: true,
				controller: 'CardOrderDetailDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/bank/ctrl.card-order-detail-dialog.html',
				size: "md",
				resolve: {
					order: function () {	return order; }
				}
			})
		}

		function issueCard(order) {
			notificationService.showModal({
				animation: true,
				controller: 'BankCardIssueDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/bank/ctrl.card-bank-issue-dialog.html',
				size: "sm",
				resolve: {
					order: function () {	return order; },
					card: function () {
						return order.status == constants.enums.orderStatus.ISSUED ?
							bankService.getCardDetailByOrerId(order.id) : null;
					}
				}
			}).then(function (card) {
				notificationService.toastSuccess('card.bank.issuedSuccessfully', 'card.bank.issue');
				vm.tableParams.reload();
			});
		}

		function rejectCard(order) {
			notificationService.showModal({
				animation: true,
				controller: 'BankCardRejectDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/bank/ctrl.card-bank-reject-dialog.html',
				size: "sm",
				resolve: {
					order: function () {	return order; }
				}
			}).then(function (card) {
				notificationService.toastSuccess('global.messages.operationDoneSuccessfully', 'card.bank.reject');
				vm.tableParams.reload();
			});
		}

		function cancelCard(card) {

		}

		function selectRow(row) {
			if (vm.tableParams.selectedRow != row)
				vm.tableParams.selectedRow = row;
			else
				vm.tableParams.selectedRow = null;
		}
	}
})();
