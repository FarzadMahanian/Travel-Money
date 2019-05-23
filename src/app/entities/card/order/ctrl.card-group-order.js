(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardGroupOrderController', CardGroupOrderController);

	CardGroupOrderController.$inject = ['cardService', '$scope', 'commonService', 'generalDataService', 'groupOrder'];

	function CardGroupOrderController(cardService, $scope, commonService, generalDataService, groupOrder) {
		var vm = this;
		vm.isEdit = !(!groupOrder.id);
		vm.gotoWizardStep = gotoWizardStep;
		vm.saveOrderInfo = saveOrderInfo;
		vm.confirmGroupOrderRequest = confirmGroupOrderRequest;
		vm.getPassengersForConfirm = getPassengersForConfirm;
		vm.activeTabIndex = 0;
		vm.wizardItems = ['card.groupOrder.orderInfo', 'card.groupOrder.passengerInfo', 'card.groupOrder.confirmData', 'card.groupOrder.finish'];
		vm.cities = [];
		vm.deliveryPlaces = [];
		vm.order = groupOrder;
		activate();

		////////////////

		function activate() {
			getCitiesByCountryId();
			$scope.$watch(function () {
				return vm.order.cityId;
			}, function (newValue, oldValue) {
				if (!newValue) return;
				vm.deliveryPlaces = [];
				vm.deliveryPlaceId = null;
				if (!newValue) return;
				commonService.getDeliveryPlacesByCityId(newValue).then(function (deliveryPlaces) {
					vm.deliveryPlaces = deliveryPlaces;
				});
			});
		}

		function gotoWizardStep(step) {
			vm.activeTabIndex = step;
		}

		function saveOrderInfo() {
			$scope.groupCardOrderForm.$isLoading = true;
			var method = vm.order.id ? 'updateGroupOrder' : 'createGroupOrder';
			cardService[method](vm.order).then(function (groupOrder) {
				vm.order.id = groupOrder.id;
				$scope.groupCardOrderForm.$isLoading = false;
				gotoWizardStep(1);
			});
		}

		function getCitiesByCountryId() {
			var countryId = 1;
			generalDataService.getCitiesByCountryId(countryId).then(function (cities) {
				vm.cities = cities;
			});
		}

		function confirmGroupOrderRequest() {
			cardService.confirmGroupOrder(vm.order.id).then(function (result) {
				vm.resultOfConfirmGroupOrder = result;
				gotoWizardStep(3);
			});
		}

		function getPassengersForConfirm() {
			cardService.getGroupOrderById(vm.order.id).then(function (result) {
				vm.order = result;
				gotoWizardStep(2);
			});
		}
	}
})();
