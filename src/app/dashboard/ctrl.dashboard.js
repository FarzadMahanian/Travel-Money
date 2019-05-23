(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$timeout', 'notificationService', 'authenticationService', 'httpService'];
	function DashboardController($scope, $timeout, notificationService, authenticationService, httpService) {
		$scope.click = function() {
			$scope.show = !$scope.show;
		}
		activate();

		////////////////

		function activate() {
		}
	}
})();
