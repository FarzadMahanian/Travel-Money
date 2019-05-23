(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('generalDataService', generalDataService);

	generalDataService.$inject = ['commonService', '$q', 'utilityService', 'httpService'];
	function generalDataService(commonService, $q, utilityService, httpService) {
		var personalTitlesCache = null,
			 personalGendersCache = null,
			 securityQuestionsCache = null,
			 countriesCache = null,
			 citiesCache = null;

		var service = {
			getPersonalTitles: getPersonalTitles,
			getPersonalGenders: getPersonalGenders,
			getSecurityQuestions: getSecurityQuestions,
			getCountries: getCountries,
			getCitiesByCountryId: getCitiesByCountryId,
			getSystemCurrencies: getSystemCurrencies,
		};

		return service;

		////////////////


		function getSystemCurrencies() {
			// return $q.when([
			// 	{id:'USSD', name:'United States Dolar', symbol:'$', frac: 2},
			// 	{id:'IRR', name:'Iran Rial', symbol:'﷼', frac: 0},
			// 	{id:'EUR', name:'Euro', symbol:'€', frac: 2},
			// 	{id:'CNY', name:'China Yuan Renminbi', symbol:'¥', frac: 0},
			// 	{id:'AUD', name:'Australia Dollar', symbol:'$', frac: 2},
			// 	{id:'GBP', name:'United Kingdom Pound', symbol:'£', frac: 2},
			// 	{id:'JPY', name:'Japan Yen', symbol:'¥', frac: 0},
			// 	{id:'MYR', name:'Malaysia Ringgit', symbol:'RM', frac: 0}
			// ]);

			return httpService.getObject('travelmoney/currency/api/v1/list');
		}

		function getPersonalTitles() {
			if (personalTitlesCache)
				return $q.when(personalTitlesCache);

			return utilityService.injectDeffered(commonService.getKeyValue('tmPersonalTitles'),function (result) {
				personalTitlesCache = JSON.parse(result.value);
				return personalTitlesCache;
			});
		}

		function getPersonalGenders() {
			if (personalGendersCache)
				return $q.when(personalGendersCache);

			return utilityService.injectDeffered(commonService.getKeyValue('tmPersonalGenders'),function (result) {
				personalGendersCache = JSON.parse(result.value);
				return personalGendersCache;
			});
		}

		function getSecurityQuestions() {
			if (securityQuestionsCache)
				return $q.when(securityQuestionsCache);

			return utilityService.injectDeffered(commonService.getKeyValue('tmSecurityQuestions'),function (result) {
				securityQuestionsCache = JSON.parse(result.value);
				return securityQuestionsCache;
			});
		}

		function getCountries() {
			if (countriesCache)
				return $q.when(countriesCache);

			return utilityService.injectDeffered(commonService.getCountries(),function (result) {
				countriesCache = result.content;
				return countriesCache;
			});
		}

		function getCitiesByCountryId(countryId) {
			if (citiesCache)
				return $q.when(citiesCache);

			return utilityService.injectDeffered(commonService.getCitiesByCountryId(countryId),function (result) {
				citiesCache = result.content;
				return citiesCache;
			});
		}

	}
})();
