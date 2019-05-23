(function () {
	'use strict';

	angular
		.module('bpApp')
		// Config translation module
		.config(['$translateProvider', '$httpProvider', 'configProvider', function ($translateProvider, $httpProvider, configProvider) {

			// configProvider.setServerBaseUrl('http://localhost:3100/');
			configProvider.setServerBaseUrl('http://178.62.252.62:8000/');
			configProvider.setPaymentServerBaseUrl('http://persiatravelmoney.my:8000/');
			configProvider.setAppBaseName('travelmoney');
			configProvider.setAppTitle('Travel Money');
			configProvider.setHasLoginCaptcha(true);
			configProvider.setColorfullLogoSrc('assets/img/logo-travelmoney-color.png');
			configProvider.setOAuthConfig({
                  //   baseUrl: 'http://localhost:3100/',
                    baseUrl: 'http://178.62.252.62:8000/',
                    clientId: 'travelMoney_app',
                    grantPath: 'security/oauth/token'
                });
		}])
		.run(['moduleRegisteryService', function (moduleRegisteryService) {
			moduleRegisteryService.addSidebarMenuItem('dashboard.title','fa fa-dashboard','app.dashboard', 0, 1, null);
		}]);
})();
