(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardLoadController', CardLoadController);

	CardLoadController.$inject = ['$scope', 'generalDataService', 'cardService', 'notificationService', 'ipgService', 'locationService', 'exchangeService', 'utilityService'];

	function CardLoadController($scope, generalDataService, cardService, notificationService, ipgService, locationService, exchangeService, utilityService) {
		$scope.loadInfo = {
			"dest": "",
			"destAmount": null,
			"destCurrency": "IRR",
			"sourceAmount": null,
			"sourceCurrency": null,
		}
		$scope.paymentStatus = (locationService.getParams('status')||'').toUpperCase();
		$scope.isLoading = false;
		$scope.isLoadingExchange = false;
		$scope.loadCard = loadCard;

		activate();

		////////////////

		function activate() {
			cardService.getCurrentUserCards().then(function (cards) {
				$scope.cards = cards.content;
			});

			exchangeService.getAllExchanges('irr').then(function (result) {
				result = utilityService.grepArray(result, function(item) {
					return item.active;
				});
				result = utilityService.mapArray(result, function (item) {
					item.source.rate = item.rate;
					return item.source;
				});
				$scope.currencies = result;
			});

			// generalDataService.getSystemCurrencies().then(function (currencies) {
			// });

			$scope.$watch('loadInfo.sourceCurrency', function (newVal, oldVal) {
				if (newVal == oldVal || !newVal || !$scope.loadInfo.sourceAmount) return;
				updateExchangeAmount();
			});
			$scope.$watch('loadInfo.sourceAmount', function (newVal, oldVal) {
				if (newVal == oldVal || !newVal || !$scope.loadInfo.sourceCurrency) return;
				updateExchangeAmount();
			});
		}

		function updateExchangeAmount() {
			// $scope.isLoadingExchange = true;
			// cardService.exchangeCurrency($scope.loadInfo).then(function (result) {
			// 	$scope.isLoadingExchange = false;
			// 	$scope.loadInfo.destAmount = result.data;
			// });
			$scope.loadInfo.destAmount = $scope.loadInfo.sourceCurrency.rate * $scope.loadInfo.sourceAmount;
		}

		function loadCard() {
			if (!$scope.newCardLoadForm.$valid){
				return;
			}
			$scope.isLoading = true;
			var obj = angular.copy($scope.loadInfo);
			obj.sourceCurrency = obj.sourceCurrency.name;
			cardService.loadCard(obj).then(function (result) {
				ipgService.redirectToPaymentPage(result.data);
			}, function () {
				$scope.isLoading = false;
			});
		}

	}
})();
