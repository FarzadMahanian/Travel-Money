(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('RootController', RootController);

	RootController.$inject = ['$scope', '$rootScope', 'authenticationService', 'localeService', 'systemLocales','generalData','constants'];
	function RootController($scope, $rootScope, authenticationService, localeService, systemLocales, generalData, constants) {
		$rootScope.app = {
			title: 'global.siteTitle'
		};
		activate();

		////////////////

		function activate() {
			var defaultLocale = localeService.getDefaultLocale();
			localeService.changeLocale(defaultLocale);
			$rootScope.systemCurrencies = generalData[0];
			$rootScope.locale = defaultLocale;
			$rootScope.currentUser = authenticationService.getCurrentUser();
			$rootScope.constants = constants;
		}
	}
})();
