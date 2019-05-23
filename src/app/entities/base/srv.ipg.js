(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('ipgService', ipgService);

	ipgService.$inject = ['httpService', '$q', 'locationService', 'constants'];

	function ipgService(httpService, $q, locationService, constants) {
		var paymentUrl = constants.paymentServerBaseUrl + 'travelmoney/ipg-pay?id=';
		var service = {
			getEnrollFee: getEnrollFee,
			redirectToPaymentPage: redirectToPaymentPage
		};

		return service;

		////////////////

		function redirectToPaymentPage(refNo) {
			locationService.url(paymentUrl+ refNo);
		}

		function getEnrollFee() {
			return httpService.getObject('travelmoney/api/v1/ipg/enroll/fee');
		}
	}
})();
