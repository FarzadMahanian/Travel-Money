(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('CardDeliverDialogController', CardDeliverDialogController);

	CardDeliverDialogController.$inject = ['cardService', 'card', '$scope'];
	function CardDeliverDialogController(cardService, card, $scope) {
		var vm = this;
		vm.delivery = {};
		vm.deliverCard = deliverCard;
		activate();

		////////////////

		function activate() { }

		function deliverCard() {
			vm.isLoading = true;
			cardService.deliverCard(card, vm.delivery.reason).then(function () {
				vm.isLoading = false;
				$scope.$close();
			}, function () {
				vm.isLoading = false;
			})
		}
	}
})();
