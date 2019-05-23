(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardOrderListController', CardOrderListController);

	CardOrderListController.$inject = ['$scope', 'cardService', 'notificationService', 'ipgService'];

	function CardOrderListController($scope, cardService, notificationService, ipgService) {
		$scope.isLoading = false;
		$scope.showDetail = showDetail;
		$scope.selectRow = selectRow;
		$scope.repayOrder = repayOrder;
		cardService.fillCardOrderListTableParams($scope);

		activate();

		////////////////

		function activate() {}


		function repayOrder(order) {
			$scope.tableParams.settings().$loading = true;
			cardService.saveOrder(order).then(function (result) {
				$scope.tableParams.settings().$loading = false;
				if (result.data) {
					ipgService.redirectToPaymentPage(result.data);
				}
			});
		}

		function showDetail(order) {
			notificationService.showModal({
				animation: true,
				controller: 'CardOrderDetailDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/bank/ctrl.card-order-detail-dialog.html',
				size: "md",
				resolve: {
					order: function () {
						return order;
					}
				}
			});
		}

		function selectRow(row) {
			if ($scope.tableParams.selectedRow != row)
				$scope.tableParams.selectedRow = row;
			else
				$scope.tableParams.selectedRow = null;
		}
	}
})();
