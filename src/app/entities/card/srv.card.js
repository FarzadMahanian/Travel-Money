(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('cardService', cardService);

	cardService.$inject = ['httpService', '$q', 'commonService', 'NgTableParams', 'filterService', 'utilityService', 'constants', '$filter'];

	function cardService(httpService, $q, commonService, NgTableParams, filterService, utilityService, constants, $filter) {
		var cardSRV = {
			generateRawCardOrder: generateRawCardOrder,
			getAllUserCards: getAllUserCards,
			saveOrder: saveOrder,
			loadCard: loadCard,
			exchangeCurrency: exchangeCurrency,
			getAllCardOrders: getAllCardOrders,
			getCurrentUserCards: getCurrentUserCards,
			getAllMyCardLoadHistory: getAllMyCardLoadHistory,
			fillCardOrderListTableParams: fillCardOrderListTableParams,
			fillCardGroupOrderListTableParams: fillCardGroupOrderListTableParams,
			fillCardListTableParams: fillCardListTableParams,
			fillCardLoadHistoryTableParams: fillCardLoadHistoryTableParams,
			getCardOrderPageWizardTabs: getCardOrderPageWizardTabs,
			getCardOrderLastStepTemplate: getCardOrderLastStepTemplate,
			getCardTransactionHistory: getCardTransactionHistory,
			getCardTransactionHistoryTableParams: getCardTransactionHistoryTableParams,
			fillCardDeliveryListTableParams: fillCardDeliveryListTableParams,
			fillCardGroupOrderPassengersListTableParams: fillCardGroupOrderPassengersListTableParams,
			deliverCard: deliverCard,
			createGroupOrder: createGroupOrder,
			updateGroupOrder: updateGroupOrder,
			deleteGroupOrder: deleteGroupOrder,
			getGroupOrderById: getGroupOrderById,
			insertGroupOrderPassenger: insertGroupOrderPassenger,
			updateGroupOrderPassenger: updateGroupOrderPassenger,
			deleteGroupOrderPassenger: deleteGroupOrderPassenger,
			confirmGroupOrder: confirmGroupOrder,
			checkEmailAvailability: checkEmailAvailability
		};

		return cardSRV;

		////////////////

		function getCardTransactionHistoryTableParams(dataset) {
			return new NgTableParams({
				sorting: {
					date: "desc"
				}
			}, {
				dataset: dataset
			});
		}

		function getCardTransactionHistory(cardInfo) {
			return httpService.postObject('travelmoney/api/v1/ipg/card/history', cardInfo);
		}


		function getCardOrderLastStepTemplate(isFree, pageState) {
			if (!pageState) {
				return !isFree ? 'app/entities/card/order/tmpl.card-order-payment.html' : 'app/entities/card/order/tmpl.card-order-finish.html';
			}

			return 'app/entities/card/order/tmpl.card-order-' + pageState.toLowerCase() + '.html';
		}

		function getCardOrderPageWizardTabs(hasPersonalDetail, isFree) {
			if (hasPersonalDetail) {
				return [
					"personal.detail.title",
					"card.order.deliveryCondition",
					"card.order.confirmData", !isFree ? "card.order.payment" : "card.order.finish"
				];
			} else {
				return [
					"form.generalInformation.title",
					"form.passportInformation.title",
					"form.addressInformation.title",
					"form.securityQuestion.title",
					"card.order.deliveryCondition",

					"card.order.confirmData", !isFree ? "card.order.payment" : "card.order.finish"
				];
			}
		}

		function fillCardGroupOrderPassengersListTableParams(scope, dataset) {
			scope.tableParams = new NgTableParams({
				sorting: {
					'fullName': "desc"
				}
			}, {
				dataset: dataset
			});

			scope.selectRow = function(row) {
				if (scope.tableParams.selectedRow != row)
					scope.tableParams.selectedRow = row;
				else
					scope.tableParams.selectedRow = null;
			}
		}

		function fillCardDeliveryListTableParams(scope) {
			scope.tableParams = new NgTableParams({
				sorting: {
					'order.arrivalDate': "desc"
				}
			}, {
				getData: function (params) {
					if (!params.filter().deliveryPlaceId) return $q.when([]);
					var listInput = utilityService.tableParamsToListInput(params);
					return getAllIssuedCards(listInput).then(function (result) {
						params.total(result.totalElements);
						return result.content;
					});
				}
			});

			var deliveryPlaceDataset = [];
			commonService.getDeliveryPlacesByCityId().then(function (deliveryPlaces) {
				deliveryPlaceDataset.push.apply(deliveryPlaceDataset, deliveryPlaces);
				scope.tableParams.filter().deliveryPlaceId = scope.filter.deliveryPlaceId = 1;
				scope.tableParams.reload();
			});
			scope.filter = {};
			scope.searchFilter = function (filter) {
				scope.tableParams.filter(angular.copy(filter))
			};
			scope.filterFieldMetadata = filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-sm-6')
				.addField('deliveryPlaceId', 'card.order.deliveryPlace', 'select', '', '', deliveryPlaceDataset).required(true).row()
				.addCol('col-xs-12 col-sm-6')
				.addField('status', 'grid.status', 'select', '', '', []).config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('firstName', 'global.firstName', 'text', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('surname', 'global.surname', 'text', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('arrivalDateFrom', 'card.order.arrivalDateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('arrivalDateTo', 'card.order.arrivalDateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').config();
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
			scope.searchFilter = function (filter) {
				scope.tableParams.filter(angular.copy(filter))
			};
			scope.filterFieldMetadata = filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('arrivalDateFrom', 'card.order.arrivalDateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('arrivalDateTo', 'card.order.arrivalDateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('dateFrom', 'card.order.dateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('dateTo', 'card.order.dateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('deliveryPlace', 'card.order.deliveryPlace', 'text').row()
				.addCol('col-xs-12 col-md-6')
				.addField('status', 'grid.status', 'select', '', '', utilityService.objectToDropDownDataset(constants.enums.orderStatus, true)).config();
		}

		function fillCardGroupOrderListTableParams(scope) {
			scope.tableParams = new NgTableParams({
				sorting: {
					creationDate: "desc"
				}
			}, {
				getData: function (params) {
					var listInput = utilityService.tableParamsToListInput(params);
					return getAllCardGroupOrders(listInput).then(function (result) {
						params.total(result.totalElements);
						return nwmapper.map('CardGroupOrderDTO', 'CardGroupOrderVM',result.content);
					});
				}
			});

			scope.filter = {};
			scope.searchFilter = function (filter) {
				scope.tableParams.filter(angular.copy(filter))
			};
			scope.filterFieldMetadata = filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('name', 'global.title', 'text').row()
				.addCol('col-xs-12 col-md-6')
				.addField('arrivalDateFrom', 'card.order.arrivalDateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('arrivalDateTo', 'card.order.arrivalDateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('deliveryPlace', 'card.order.deliveryPlace', 'text').row()
				.addCol('col-xs-12 col-md-6')
				.addField('status', 'grid.status', 'select', '', '', utilityService.objectToDropDownDataset(constants.enums.groupOrderStatus, true)).config();

			scope.selectRow = function(row) {
				if (scope.tableParams.selectedRow != row)
					scope.tableParams.selectedRow = row;
				else
					scope.tableParams.selectedRow = null;
			}
		}

		function fillCardListTableParams(scope) {
			scope.tableParams = new NgTableParams({
				sorting: {
					creationDate: "desc"
				}
			}, {
				getData: function (params) {
					var listInput = utilityService.tableParamsToListInput(params);
					return getCurrentUserCards(listInput).then(function (result) {
						params.total(result.totalElements);
						return result.content;
					});
				}
			});
			var cardDataset = [],
				separateFilter = $filter('separate');
			_fillCurrentUserCards(cardDataset);
			scope.filter = {};
			scope.searchFilter = function (filter) {
				scope.tableParams.filter(angular.copy(filter))
			};
			scope.filterFieldMetadata = filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('pan', 'card.bank.pan', 'select', '', '', cardDataset).row()
				.addCol('col-xs-12 col-md-6')
				.addField('status', 'grid.status', 'select', '', '', utilityService.objectToDropDownDataset(constants.enums.cardStatus)).config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('issueDateFrom', 'card.order.dateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('issueDateTo', 'card.order.dateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('expirationDate', 'card.bank.expirationDate', 'text').config();
		}

		function _fillCurrentUserCards(cardDataset) {
			var separateFilter = $filter('separate');
			getCurrentUserCards().then(function (result) {
				angular.forEach(result.content, function (card) {
					cardDataset.push({
						id: card.pan,
						name: separateFilter(card.pan)
					});
				});
			});
		}

		function fillCardLoadHistoryTableParams(scope) {
			scope.tableParams = new NgTableParams({
				sorting: {
					creationDate: "desc"
				}
			}, {
				getData: function (params) {
					var listInput = utilityService.tableParamsToListInput(params);
					return getAllMyCardLoadHistory(listInput).then(function (result) {
						params.total(result.totalElements);
						return result.content;
					});
				}
			});

			var cardDataset = [];
			_fillCurrentUserCards(cardDataset);
			scope.filter = {};
			scope.searchFilter = function (filter) {
				scope.tableParams.filter(angular.copy(filter))
			};
			scope.filterFieldMetadata = filterService.createFilterConfig()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('dest', 'card.bank.pan', 'select', '', '', cardDataset).row()
				.addCol('col-xs-12 col-md-6')
				.addField('sourceStatus', 'card.load.sourceStatus', 'select', 'col-xs-6', 'col-xs-6 p-0', utilityService.objectToDropDownDataset(constants.enums.paymentStatus)).col()
				.addField('destStatus', 'card.load.destStatus', 'select', 'col-xs-6', 'col-xs-6 p-0', utilityService.objectToDropDownDataset(constants.enums.paymentStatus)).config()
				.addRow()
				.addCol('col-xs-12 col-md-6')
				.addField('amountFrom', 'card.load.amountFrom', 'text', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('amountTo', 'card.load.amountTo', 'text', 'col-xs-6', 'col-xs-6 p-0').row()
				.addCol('col-xs-12 col-md-6')
				.addField('issueDateFrom', 'card.order.dateFrom', 'date', 'col-xs-6', 'col-xs-6 p-0').col()
				.addField('issueDateTo', 'card.order.dateTo', 'date', 'col-xs-6', 'col-xs-6 p-0').config();
		}

		function getAllMyCardLoadHistory(listInput) {
			var url = utilityService.buildUrl('travelmoney/api/v1/ipg/loads', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}


		function saveOrder(orderVM) {
			var orderDTO = nwmapper.map('CardOrderVM', 'CardOrderDTO', orderVM);
			return httpService.httpPost('travelmoney/api/v1/ipg/enroll/payment', orderDTO);
		}

		function generateRawCardOrder() {
			return {
				visaScan: [],
				termsOfCondition: "Persia Travel Money card shall be used for performing banking transactions on the accountholder’s account by electronic means such as ATM’s or POS or through services offered directly by Persia Travel Money."
			};
		}

		function getAllCardGroupOrders(listInput) {
			var url = utilityService.buildUrl('travelmoney/api/v1/order/group/all', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}

		function getAllCardOrders(listInput) {
			var url = utilityService.buildUrl('travelmoney/api/v1/order/list', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}


		function getAllUserCards(page, total, order, direction, filter) {
			return httpService.getObject('travelmoney/api/v1/card/all/' + page + '/' + total + '/' + order + '/' + direction + '/' + filter);
		}

		function getAllIssuedCards(listInput) {
			var url = utilityService.buildUrl('travelmoney/api/v1/card/all/issued', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}

		function getCurrentUserCards(listInput) {
			listInput = listInput || {
				table: {
					page: 0,
					total: 100,
					order: 'id',
					direction: 'asc'
				}
			};
			var url = utilityService.buildUrl('travelmoney/api/v1/card/list', [listInput.table, listInput.filter]);
			return httpService.getObject(url);
		}

		function loadCard(info) {
			return httpService.postObject('travelmoney/api/v1/ipg/load_card', info);
		}

		function exchangeCurrency(info) {
			return httpService.getObject('financial/api/v1/exchange/rate/' + info.sourceCurrency + '/' + info.sourceAmount + '/' + info.destCurrency);
		}

		function deliverCard(card, comment) {
			return httpService.postObject('travelmoney/api/v1/card/deliver', card);
		}

		function getGroupOrderById(id) {
			return httpService.getObject('travelmoney/api/v1/order/group/'+id).then(function (result) {
				return nwmapper.map('CardGroupOrderDTO', 'CardGroupOrderVM', result)
			});
		}

		function createGroupOrder(newGroupOrder) {
			return httpService.postObject('travelmoney/api/v1/order/group/draft/add', newGroupOrder);
		}

		function deleteGroupOrder(id) {
			return httpService.deleteObject('travelmoney/api/v1/order/group/draft/delete/'+id);
		}

		function updateGroupOrder(groupOrder) {
			return httpService.putObject('travelmoney/api/v1/order/group/draft/edit', groupOrder);
		}

		function insertGroupOrderPassenger(passengerVM) {
			var passengerDto = nwmapper.map('PassengerDetailVM', 'PassengerDetailDto', passengerVM);
			return httpService.postObject('travelmoney/api/v1/order/group/draft/passenger/add/'+passengerDto.orderGroup, passengerDto);
		}

		function updateGroupOrderPassenger(passengerVM) {
			var passengerDto = nwmapper.map('PassengerDetailVM', 'PassengerDetailDto', passengerVM);
			return httpService.putObject('travelmoney/api/v1/order/group/draft/passenger/edit', passengerDto);
		}

		function deleteGroupOrderPassenger(id) {
			return httpService.deleteObject('travelmoney/api/v1/order/group/draft/passenger/delete/'+id);
		}

		function confirmGroupOrder(groupOrderId) {
			return httpService.postObject('travelmoney/api/v1/order/group/draft/finalize/'+groupOrderId);
		}

		function checkEmailAvailability(email) {
			var checkEmail = {
				key: email
			};
			return httpService.postObject('security/api/v1/users/exists',checkEmail);
		}
	}
})();
