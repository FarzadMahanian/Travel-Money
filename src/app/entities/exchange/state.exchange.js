(function () {
	'use strict';

	angular
		.module('bpApp')
		.config(['$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {

				$urlRouterProvider.otherwise("/card/order");

				$stateProvider
					.state('app.exchange', {
						url: '/exchange',
						template: '<ui-view/>',
						abstract: true
					})
					.state('app.exchange.list', {
						url: '/list',
						templateUrl: 'app/entities/exchange/ctrl.exchange-list.html',
						controller: 'ExchangeListController',
						controllerAs: 'vm'
					});
			}
		]);
})();
