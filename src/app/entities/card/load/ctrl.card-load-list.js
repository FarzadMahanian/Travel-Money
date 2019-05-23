(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardLoadListController', CardLoadListController);

	CardLoadListController.$inject = ['$scope', 'cardService','filterService'];
	function CardLoadListController($scope, cardService, filterService) {
		cardService.fillCardLoadHistoryTableParams($scope);
		activate();

		////////////////

		function activate() {
		}

	}
})();
