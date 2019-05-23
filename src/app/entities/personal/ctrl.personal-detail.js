(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('PersonalDetailController', PersonalDetailController);

	PersonalDetailController.$inject = ['$scope', 'personalService', 'personalDetail'];
	function PersonalDetailController($scope, personalService, personalDetail) {
		$scope.gotoWizardStep = gotoWizardStep;
		$scope.activeTabIndex = 0;
		$scope.securityQuestions = [];
		$scope.saveForm = saveForm;
		$scope.personalDetail = personalService.convertDtoToViewModel(personalDetail);
		$scope.tabIndexSeed = 0;
		$scope.wizardItems = [
		    "form.generalInformation.title",
		    "form.passportInformation.title",
		    "form.addressInformation.title",
		    "form.securityQuestion.title"		
		];
		activate();

		////////////////

		function activate() {
			personalService.fillScopeBaseData($scope);
		}

		function saveForm(){
			personalService.saveForm($scope);
		}

		function gotoWizardStep(step) {
			$scope.activeTabIndex = step;
		}

	}
})();
