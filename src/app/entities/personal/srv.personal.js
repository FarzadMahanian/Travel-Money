(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('personalService', personalService);

	personalService.$inject = ['httpService', '$q', 'authenticationService', 'generalDataService','notificationService'];

	function personalService(httpService, $q, authenticationService, generalDataService,notificationService) {
		var service = {
			generateRawPersonalDetail: generateRawPersonalDetail,
			create: create,
			update: update,
			convertDtoToViewModel: convertDtoToViewModel,
			getDetail: getDetail,
			fillScopeBaseData: fillScopeBaseData,
			saveForm: saveForm
		};

		return service;

		////////////////

		function saveForm($scope){
			var deffered = $q.defer();
			if (!$scope.newPersonalDetailForm.$valid) {
				deffered.reject("invalid_form");
				return deffered.promise;
			}
			$scope.newPersonalDetailForm.$isLoading = true;

			update($scope.personalDetail).then(function (result) {
				$scope.newPersonalDetailForm.$isLoading = false;
				deffered.resolve();
				notificationService.toastSuccess('global.messages.entitySaved', 'global.messages.saving');
			}, function (reason) {
				deffered.reject(reason);
				$scope.newPersonalDetailForm.$isLoading = false;
			});
			return deffered.promise;
		}

		function fillScopeBaseData($scope) {
			generalDataService.getPersonalTitles().then(function (titles) {
				$scope.personalTitle = titles;
			});

			generalDataService.getPersonalGenders().then(function (genders) {
				$scope.personalGender = genders;
			});

			generalDataService.getSecurityQuestions().then(function (questions) {
				$scope.securityQuestions = questions;
			});

			generalDataService.getCountries().then(function (countries) {
				$scope.countries = countries;
			});
		}

		function convertDtoToViewModel(dto) {
			return nwmapper.map('PersonalDetailDto','PersonalDetailVM',dto);
		}

		function generateRawPersonalDetail() {
			return {
				passportScan: []
			};
		}

		function create(username) {
			return httpService.httpPost('travelmoney/api/v1/customer/create', {
				"userName": username
			}, {
				headers: {
					Authorization: null
				}
			});
		}

		function update(personalDetail) {
			var dto = nwmapper.map('PersonalDetailVM', 'PersonalDetailDto', personalDetail);
			return httpService.httpPost('travelmoney/api/v1/customer/update', dto);
		}


		function getDetail() {
			return httpService.httpGet('travelmoney/api/v1/customer/details')
		}
	}
})();
