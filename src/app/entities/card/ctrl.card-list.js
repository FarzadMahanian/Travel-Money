(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardListController', CardListController);

	CardListController.$inject = ['$scope', 'cardService'];

	function CardListController($scope, cardService) {
		cardService.fillCardListTableParams($scope);
		activate();

		////////////////

		function activate() {}

	}
})();
