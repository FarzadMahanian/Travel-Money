(function () {
	'use strict';

	angular
		.module('bpApp')
		// PersonalDetail Entity Mappings
		.run(['utilityService',
		function (utilityService) {

			nwmapper.initialize(function (cb) {

				/* ViewModel To DTO mappings */
				cb.createMap('CardOrderVM', 'CardOrderDTO', function (emb) {
					emb.forMember('visaScan', 'visaScan', function(files){
						return files && files.length ? files[0].id : '';
					});
				});


				/* DTO To ViewModel mappings */
				cb.createMap('CardGroupOrderDTO', 'CardGroupOrderVM', function (emb) {
					emb.forMember('deliveryPlace', 'deliveryPlaceName', function(deliveryPlace){
						return deliveryPlace.name;
					});
					emb.forMember('deliveryPlace', 'cityId', function(deliveryPlace){
						return deliveryPlace.city;
					});
					emb.forMember('groupOrderCustomerTemps', 'passengersCount', function(groupOrderCustomerTemps){
						return groupOrderCustomerTemps.length;
					});

				});

				// Group Order Passenger
				cb.createMap('PassengerDetailDto','PassengerDetailVM', function (emb) {
					emb.forMember('passportScan', 'passportScan', function(file){
						return file ? [{id:file}] : [];
					});
					emb.forMember('visaScan', 'visaScan', function(file){
						return file ? [{id:file}] : [];
					});
				});


				/* Passengers ViewModel To DTO mappings */
				cb.createMap('PassengerDetailVM', 'PassengerDetailDto', function (emb) {
					emb.forMember('passportScan', 'passportScan', function(files){
						return files[0] ? files[0].id : null;
					});
					emb.forMember('visaScan', 'visaScan', function(files){
						return files[0] ? files[0].id : null;
					});
				});

			});
		}]);
})();
