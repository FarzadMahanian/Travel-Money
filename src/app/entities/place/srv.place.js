(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('placeService', placeService);

	placeService.$inject = ['httpService', '$q'];
	function placeService(httpService, $q) {
		var placeSRV = {
			generateRawPlace: generateRawPlace
		};

		return placeSRV;

		////////////////


		function generateRawPlace(){
			return {};
		}

	}
})();
