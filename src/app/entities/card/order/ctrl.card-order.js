(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardOrderController', CardOrderController);

	CardOrderController.$inject = ['$scope', 'generalDataService', 'cardService', 'personalService', 'personalDetail', 'commonService',
		'enrollFee', 'ipgService', 'locationService'];
	function CardOrderController($scope, generalDataService, cardService, personalService, personalDetail, commonService, enrollFee,
		ipgService, locationService) {

		$scope.gotoWizardStep = gotoWizardStep;
		$scope.card = cardService.generateRawCardOrder();
		$scope.coutryId = 1;
		$scope.hasPersonalDetail = personalDetail && personalDetail.firstName && personalDetail.passportNo;
		$scope.personalDetail = personalService.convertDtoToViewModel(personalDetail);
		$scope.getDeliveryPlaceTitleById = getDeliveryPlaceTitleById;
		$scope.personalDetailSaving = false;
		$scope.cardOrderSaving = false;
		enrollFee.isFree = enrollFee.data<=0;
		var paymentState = locationService.getParams('status');
		$scope.lastStepTemplateUrl = cardService.getCardOrderLastStepTemplate(enrollFee.isFree, paymentState);
		$scope.tabIndexSeed = $scope.hasPersonalDetail ? 0 : 4;
		$scope.activeTabIndex = !paymentState ? 0 : $scope.tabIndexSeed+3;
		$scope.deliveryPlaces = [];
		$scope.wizardItems = cardService.getCardOrderPageWizardTabs($scope.hasPersonalDetail, enrollFee.isFree);

		activate();

		////////////////

		function activate() {

			getCountries();
			getCitiesByCountryId();
			personalService.fillScopeBaseData($scope);

			$scope.$watch('card.cityId', function(newValue, oldValue){
				if (newValue==oldValue) return;
				$scope.deliveryPlaces = [];
				$scope.card.deliveryPlaceId = null;
				if (!newValue) return;
				commonService.getDeliveryPlacesByCityId(newValue).then(function(deliveryPlaces){
					$scope.deliveryPlaces = deliveryPlaces;
				});
			});
		}

		function getDeliveryPlaceTitleById(id) {
			return $.grep($scope.deliveryPlaces, function(d) {
				return d.id == id;
			})[0];
		}

		function gotoWizardStep(step) {
			if (!$scope.hasPersonalDetail && step==4 && $scope.activeTabIndex==3){
				$scope.personalDetailSaving = true;
				personalService.saveForm($scope).then(function(){
					$scope.personalDetailSaving = false;
					$scope.activeTabIndex = step;
				}, function(){
					$scope.personalDetailSaving = false;
				});
				return;
			}

			if (($scope.hasPersonalDetail && step==3 && $scope.activeTabIndex==2) || (!$scope.hasPersonalDetail && step==6 && $scope.activeTabIndex==5)) {
				$scope.cardOrderSaving = true;
				cardService.saveOrder($scope.card).then(function(result){
					$scope.cardOrderSaving = false;
					if (result.data) {
						ipgService.redirectToPaymentPage(result.data);
					}
				});
			}

			$scope.activeTabIndex = step;
		}

		function getCountries() {
			generalDataService.getCountries().then(function (countries) {
				$scope.countries = countries;
			});
		}

		function getCitiesByCountryId() {
			generalDataService.getCitiesByCountryId($scope.coutryId).then(function (cities) {
				$scope.cities = cities;
			});
		}
	}
})();
