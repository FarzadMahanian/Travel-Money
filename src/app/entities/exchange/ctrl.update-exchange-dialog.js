(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('UpdateExchangeDialogController', UpdateExchangeDialogController);

	UpdateExchangeDialogController.$inject = ['$scope', 'currentExchanges', 'exchangeService', 'notificationService'];
	function UpdateExchangeDialogController($scope, currentExchanges, exchangeService, notificationService) {

		$scope.saveForm = saveForm;
		$scope.exchangeRates = angular.copy(currentExchanges);

		activate();

		////////////////

		function saveForm(){
			if (!$scope.updateExchangeCurrencyForm.$valid) return;
			$scope.isLoading = true;
			var changedItems = [];
			for (var i=0; i<currentExchanges.length; i++) {
				if (currentExchanges[i].rate!=$scope.exchangeRates[i].rate || currentExchanges[i].active!=$scope.exchangeRates[i].active){
					changedItems.push($scope.exchangeRates[i])
				}
			}
			exchangeService.updateRates(changedItems).then(function () {
				notificationService.toastSuccess('Your changes have been saved.', 'Update Successful');
				$scope.$close();
			});
			//$scope.$close($scope.currentExchanges);
		}

		function activate() {
		}
	}
})();
