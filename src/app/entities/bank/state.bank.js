(function () {
	'use strict';

	angular
		.module('bpApp')
		.config(['$stateProvider',
			function ($stateProvider) {

				$stateProvider
					.state('app.bank', {
						url: '/bank',
						template: '<ui-view/>',
						abstract: true
					})
					.state('app.bank.payment', {
						url: '/payment?{:type}&{:status}&{:id}',
						template: '<div style="margin-top: 20%;text-align: center;color: gray;font-size: 2em;"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>',
						controller: ['locationService', function (locationService) {
							var route = '';
							var type = locationService.getParams('type');
							var id = locationService.getParams('id');
							var status = locationService.getParams('status');
							switch (type) {
								case 'ISSUE_FEE':
									route = 'app.card.order';
									break;
								case 'LOAD_CARD':
									route = 'app.card.load';
									break;
								default:
									route = 'app.error.404';
									break;
							}
							locationService.go(route, {id: id, status: status});
						}],
					})
					.state('app.bank.card', {
						url: '/card/list',
						templateUrl: 'app/entities/bank/ctrl.bank-order-list.html',
						controller: 'BankOrderListController',
						controllerAs: 'vm'
					});
			}
		]);
})();
