(function () {
	'use strict';

	angular
		.module('bpApp')
		// PersonalDetail Entity Mappings
		.run(['utilityService',
		function (utilityService) {

			nwmapper.initialize(function (cb) {

				/* ViewModel To DTO mappings */
				cb.createMap('CardIssueVM', 'CardIssueDTO', function (emb) {
					emb.forMember('expirationDateMonth', 'expirationDate', function(a, obj){
						return obj.expirationDateYear + obj.expirationDateMonth;
					});
				});

				/* DTO To ViewModel mappings */
				cb.createMap('CardIssueDTO', 'CardIssueVM', function (emb) {
					emb.forMember('id', 'id');
					emb.forMember('pan', 'pan');
					emb.forMember('expirationDate', 'expirationDateMonth', function(expDate){
						return expDate.substr(2, 2);
					});
					emb.forMember('expirationDate', 'expirationDateYear', function(expDate){
						return expDate.substr(0, 2);
					});
					emb.ignoreOthers();
				});
			});
		}]);
})();
