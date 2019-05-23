(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardTransactionController', CardTransactionController);

	CardTransactionController.$inject = ['$scope', 'cardService'];
	function CardTransactionController($scope, cardService) {
		$scope.searchTransaction = searchTransaction;
		$scope.tableParams = cardService.getCardTransactionHistoryTableParams([]);
		$scope.accountBalance = null;
		$scope.transactionSearchData = {};
		activate();

		////////////////

		function activate() {
			getCards();
		}


		function getCards() {
			cardService.getCurrentUserCards().then(function (cards) {
				$scope.cards = cards.content;
			});
		}

		function searchTransaction() {
			if (!$scope.transactionSearchForm.$valid) {
				return;
			}
			$scope.transactionSearchForm.$isLoading = true;

			cardService.getCardTransactionHistory($scope.transactionSearchData).then(function (result) {
				$scope.transactionSearchForm.$isLoading = false;
				$scope.accountBalance = result.balance;
				$scope.tableParams.settings({
					dataset: result
				});
			}, function () {
				$scope.transactionSearchForm.$isLoading = false;
			});
		}
	}
})();
