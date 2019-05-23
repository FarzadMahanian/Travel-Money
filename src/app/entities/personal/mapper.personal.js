(function () {
	'use strict';

	angular
		.module('bpApp')
		// PersonalDetail Entity Mappings
		.run(['utilityService',
		function (utilityService) {

			nwmapper.initialize(function (cb) {

				/* ViewModel To DTO mappings */
				cb.createMap('PersonalDetailVM', 'PersonalDetailDto', function (emb) {
					emb.forMember('passportScan', 'passportScan', function(files){
						return files[0].id;
					});
				});

				/* DTO to ViewModel mappings */
				cb.createMap('PersonalDetailDto','PersonalDetailVM', function (emb) {
					emb.forMember('passportScan', 'passportScan', function(file){
						return file ? [{id: file, progress: 100}] : [];
					});
					emb.forMember('birthDate', 'birthDate', function(birthDate){
						return birthDate ? new Date(birthDate) : null;
					});
					emb.forMember('passportExpirationDate', 'passportExpirationDate', function(passportExpirationDate){
						return passportExpirationDate ? new Date(passportExpirationDate) : null;
					});
				});

			});
		}]);
})();
