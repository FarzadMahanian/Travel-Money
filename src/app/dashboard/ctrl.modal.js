(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$scope', '$uibModalInstance', 'items'];
	function ModalController($scope, $uibModalInstance, items) {
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		activate();

		////////////////

		function activate() {
		}
	}
})();
