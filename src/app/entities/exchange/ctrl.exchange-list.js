(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('ExchangeListController', ExchangeListController);

	ExchangeListController.$inject = ['$scope', 'notificationService', 'filterService', 'exchangeService'];

	function ExchangeListController($scope, notificationService, filterService, exchangeService) {
		var vm = this;
		//vm.tableParams = exchangeService.getExchangesListTableParams();
		vm.updateExchange = updateExchange;
		vm.showChart = showChart;
		exchangeService.fillExchangeListTableParams(vm, 'irr');

		activate();

		////////////////


		function activate() {}

		function updateExchange() {
			return notificationService.showModal({
				animation: true,
				controller: 'UpdateExchangeDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/exchange/tmpl.update-exchange-dialog.html',
				size: "md",
				resolve: {
					currentExchanges: function () {
						return angular.copy(vm.tableParams.data);
					}
				}
			}).then(function () {
				exchangeService.fillExchangeListTableParams(vm, 'irr');
			});
		}

		function showChart() {
			return notificationService.showModal({
				animation: true,
				controller: 'ShowChartDialogController',
				controllerAs: 'vm',
				templateUrl: 'app/entities/exchange/tmpl.show-chart-dialog.html',
				size: "lg",
				resolve: {
					currentExchanges: function () {
						return angular.copy(vm.tableParams.data);
					}
				}
			});
		}
	}
})();
