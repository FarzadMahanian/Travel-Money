(function () {
	'use strict';

	angular
		.module('bpApp')
		.config(['$stateProvider', function ($stateProvider) {

			$stateProvider
				.state('app.personal', {
					url: '/personal',
					template: '<ui-view/>',
					abstract: true
				})
				.state('app.personal.detail', {
					url: '/detail',
					templateUrl: 'app/entities/personal/ctrl.personal-detail.html',
					controller: 'PersonalDetailController',
					resolve: {
						personalDetail: ['personalService', function(personalService){
							return personalService.getDetail();
						}]
					}
				});
		}]);
})();
