(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('BankCardRejectDialogController', BankCardRejectDialogController);

	BankCardRejectDialogController.$inject = ['$scope', 'order','bankService'];
	function BankCardRejectDialogController($scope, order, bankService) {
		var vm = this;
		vm.card = {};
		vm.saveForm = saveForm;
		vm.isLoading = false;
		activate();

		////////////////

		function activate() { }

		function saveForm() {
			if (!$scope.rejectCardForm.$valid) return;
			vm.isLoading = true;
			vm.card.orderId = order.id;
			bankService.rejectCard(vm.card).then(function () {
				$scope.$close(vm.card);
			}, function () {
				vm.isLoading = false;
			});
		}
	}
})();
