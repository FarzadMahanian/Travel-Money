(function () {
	'use strict';

	angular
		.module('bpApp')
		.config(['$stateProvider', function ($stateProvider) {

			$stateProvider
				.state('app.place', {
					url: '/place',
					template: '<ui-view/>',
					abstract: true
				})
				.state('app.place.delivery-place', {
					url: '/delivery-place',
					templateUrl: 'app/entities/place/delivery-place.html',
					controller: 'DeliveryPlaceController'
				});
		}]);
})();
