(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('DeliveryPlaceController', DeliveryPlaceController);

	DeliveryPlaceController.$inject = ['$scope', 'generalDataService', 'placeService'];
	function DeliveryPlaceController($scope, generalDataService, placeService) {
		$scope.check = check;
		$scope.place = placeService.generateRawPlace();

		$scope.cities = [
			{
				id: 0,
				name: "Tehran"
			},
			{
				id: 1,
				name: "Isfahan"
			},
			{
				id: 2,
				name: "Shiraz"
			}
		];

		$scope.banks = [
			{
				id: 0,
				name: "Shahr Bank"
			},
			{
				id: 1,
				name: "Ourselves"
			}
		];


		activate();

		////////////////

		function activate() {

		}

		function check() {
			console.log('Check:');
			console.log($scope.place);
		}

	}
})();
