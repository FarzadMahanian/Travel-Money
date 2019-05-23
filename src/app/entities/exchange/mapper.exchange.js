(function () {
	'use strict';

	angular
		.module('bpApp')
		// PersonalDetail Entity Mappings
		.run(['utilityService',
		function (utilityService) {

			nwmapper.initialize(function (cb) {

				/* ViewModel To DTO mappings */
				cb.createMap('ExchangeRateVM', 'ExchangeRateDTO', function (emb) {
					emb.forMember('rate', 'rate');
					emb.forMember('active', 'active');
					emb.forMember('dest', 'dest', function(destCurrency){
						return destCurrency.name;
					});
					emb.forMember('source', 'source', function(sourceCurrency){
						return sourceCurrency.name;
					});
					emb.ignoreOthers();
				});

			});
		}]);
})();
