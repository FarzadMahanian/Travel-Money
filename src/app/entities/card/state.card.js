(function () {
	'use strict';

	angular
		.module('bpApp')
		.config(['$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {

				//$urlRouterProvider.otherwise("/card/order");

				$stateProvider
					.state('app.card', {
						url: '/card',
						template: '<ui-view/>',
						abstract: true
					})
					.state('app.card.order', {
						url: '/order?{:id}&{:status}',
						templateUrl: 'app/entities/card/order/ctrl.card-order.html',
						controller: 'CardOrderController',
						resolve: {
							enrollFee: ['ipgService', function (ipgService) {
								return ipgService.getEnrollFee();
							}],
							personalDetail: ['personalService', function (personalService) {
								return personalService.getDetail();
							}]
						}
					})
					.state('app.card.orderList', {
						url: '/order-list',
						templateUrl: 'app/entities/card/order/ctrl.card-order-list.html',
						controller: 'CardOrderListController'
					})
					.state('app.card.groupOrderList', {
						url: '/group-order-list',
						templateUrl: 'app/entities/card/order/ctrl.card-group-order-list.html',
						controller: 'CardGroupOrderListController',
						controllerAs: 'vm'
					})
					.state('app.card.groupOrder', {
						url: '/group-order/:id',
						templateUrl: 'app/entities/card/order/ctrl.card-group-order.html',
						controller: 'CardGroupOrderController',
						controllerAs: 'vm',
						resolve: {
							groupOrder: ['$stateParams','cardService', function($stateParams, cardService){
								var id = $stateParams.id;
								if (id) {
									return cardService.getGroupOrderById(id);
								} else {
									return { id: null };
								}
							}]
						}
					})
					.state('app.card.list', {
						url: '/list',
						templateUrl: 'app/entities/card/ctrl.card-list.html',
						controller: 'CardListController'
					})
					.state('app.card.load', {
						url: '/load?{:id}&{:status}',
						templateUrl: 'app/entities/card/load/ctrl.card-load.html',
						controller: 'CardLoadController'
					})
					.state('app.card.loadList', {
						url: '/load-list',
						templateUrl: 'app/entities/card/load/ctrl.card-load-list.html',
						controller: 'CardLoadListController'
					})
					.state('app.card.transaction', {
						url: '/transaction',
						templateUrl: 'app/entities/card/balance/ctrl.card-transaction.html',
						controller: 'CardTransactionController'
					})
					.state( 'app.card.delivery', {
						url: '/delivery',
						templateUrl: 'app/entities/card/delivery/ctrl.card-delivery.html',
						controller: 'CardDeliveryController',
						controllerAs: 'vm'
					});
			}
		]);
})();
