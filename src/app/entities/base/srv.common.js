(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('commonService', commonService);

	commonService.$inject = ['httpService', '$q', 'utilityService'];
	function commonService(httpService, $q, utilityService) {

		var service = {
			getKeyValue: getKeyValue,
			getCountries: getCountries,
			getCitiesByCountryId: getCitiesByCountryId,
			getDeliveryPlacesByCityId: getDeliveryPlacesByCityId
		};

		return service;

		////////////////

		function	getDeliveryPlacesByCityId(cityId) {
			var url = utilityService.buildUrl('travelmoney/api/v1/delivery/list',[{city: cityId}] );
			var deliveryPlaces = httpService.getObject(url);
			return utilityService.injectDeffered(deliveryPlaces, function(result) {
				var places = [];
				for(var i=0; i<result.banks.length; i++){
					for(var j=0; j<result.banks[i].branches.length; j++){
						places.push({parentName: result.banks[i].name, name: result.banks[i].branches[j].name, id: result.banks[i].branches[j].id});
					}
				}
				for(var i=0; i<result.officeBranches.length; i++){
					places.push({parentName: 'PersiaTravelMoney Office', name: result.officeBranches[i].name, id: result.officeBranches[i].id});
				}
				return places;
			});
		}

		function getKeyValue(key) {
			return httpService.getObject( 'services/api/v1/content/details/' + key);
		}

		function getCountries() {
			return httpService.getObject( 'services/api/v1/geo/countries/0/-1');
		}

		function getCitiesByCountryId(countryId) {
			return httpService.getObject( 'services/api/v1/geo/citiesOfCountry/'+ countryId +'/0/-1');
		}
	}
})();
