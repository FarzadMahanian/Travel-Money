(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('BankCardIssueDialogController', BankCardIssueDialogController);

	BankCardIssueDialogController.$inject = ['$scope','bankService', 'order', 'card'];
	function BankCardIssueDialogController($scope,bankService, order, card) {
		var vm = this;
		vm.card =card || {};
		vm.saveForm = saveForm;
		vm.isLoading = false;
		activate();

		////////////////

		function activate() { }

		function saveForm() {
			if (!$scope.issueCardForm.$valid) return;
			var ops = vm.card.id ? 'updateCard' : 'issueCard';
			vm.isLoading = true;
			vm.card.orderId = order.id;
			bankService[ops](vm.card).then(function () {
				$scope.$close(vm.card);
			}, function () {
				vm.isLoading = false;
			});
		}
	}
})();
