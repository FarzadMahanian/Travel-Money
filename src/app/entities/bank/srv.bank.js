(function() {
'use strict';

	angular
		.module('bpApp')
		.factory('bankService', bankService);

	bankService.$inject = ['httpService','NgTableParams', 'filterService', 'utilityService','constants'];
	function bankService(httpService,NgTableParams, filterService, utilityService,constants) {
		var service = {
			issueCard: issueCard,
			updateCard: updateCard,
			rejectCard: rejectCard,
			getCardDetailByOrerId: getCardDetailByOrerId,
			fillCardOrderListTableParams: fillCardOrderListTableParams
		};

		return service;

		////////////////

		function updateCard(cardVm) {
			var cardDto = nwmapper.map('CardIssueVM', 'CardIssueDTO', cardVm);
			return httpService.postObject('travelmoney/api/v1/card/update', cardDto);
		}

		function getCardDetailByOrerId(orderId) {
			return httpService.getObject('travelmoney/api/v1/card/details/-1/'+ orderId).then(function (result) {
				return nwmapper.map('CardIssueDTO', 'CardIssueVM', result);
			 });
		}

		function rejectCard(cardVm) {
			return httpService.postObject('travelmoney/api/v1/order/reject/'+cardVm.orderId, cardVm.reason);
		}

		function issueCard(cardVm)
		{
			var cardDTO = nwmapper.map('CardIssueVM', 'CardIssueDTO', cardVm);
			return httpService.postObject('travelmoney/api/v1/order/issue/' + cardVm.orderId, cardDTO);
		}


		function fillCardOrderListTableParams(scope) {
			scope.tableParams = new NgTableParams({
				sorting: {
					creationDate: "desc"
				}
			}, {
				getData: function (params) {
					var listInput = utilityService.tableParamsToListInput(params);
					return getAllCardOrders(listInput).then(function (result) {
						params.total(result.totalElements);
						return result.content;
					});
				}
			});

			scope.filter = {};
			scope.searchFilter = function (filter) { scope.tableParams.filter(angular.copy(filter)) };
			scope.filterFieldMetadata =filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('firstName', 'global.firstName', 'text', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('surname', 'global.surname', 'text', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('status', 'grid.status', 'select', '', '', utilityService.objectToDropDownDataset(constants.enums.orderStatus)).config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('arrivalDateFrom', 'card.order.arrivalDateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('arrivalDateTo', 'card.order.arrivalDateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('deliveryPlace', 'card.order.deliveryPlace', 'text').config();
		}

		function getAllCardOrders(listInput) {
			var url = utilityService.buildUrl('travelmoney/api/v1/order/list_all', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}
	}
})();
