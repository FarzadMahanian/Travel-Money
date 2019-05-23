(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('CardOrderDetailDialogController', CardOrderDetailDialogController);

	CardOrderDetailDialogController.$inject = ['order','$filter', 'constants', 'utilityService'];
	function CardOrderDetailDialogController(order, $filter, constants, utilityService) {
		var vm = this;
		vm.fieldList = [];

		activate();

		////////////////

		function activate() {
			var dateFilter = $filter('date');
			var fileUrl = constants.serverBaseUrl + 'services/file?id=';
			var noImage = 'img/no-image-icon.png';
			vm.fieldList.push({ grpTitle: utilityService.itranslate('card.order.customerInfo'), items: [
				{ key: "global.userName", value: order.username },
				{ key: "global.fullName", value: order.user },
				{ key: "global.phone", value: order.msisdn },
				{ key: "global.passportNumber", value: order.passportNumber },
				{ key: "global.passportExDate", value:  dateFilter(order.passportExpiration ,'yyyy-MM-dd') },
				{ key: "global.passportScan", value: order.passportScan ? fileUrl + order.passportScan : noImage, type: 'image' }
			]},
			{ grpTitle: utilityService.itranslate('card.order.detail'), items: [
				{ key: "card.order.orderDate", value: dateFilter(order.creationDate,'yyyy-MM-dd h:mm a') },
				{ key: "card.order.enteranceCity", value: order.city },
				{ key: "card.order.deliveryPlace", value: order.deliveryPlaceName },
				{ key: "grid.arrivalDate", value: order.arrivalDate },
				{ key: "card.order.visaExpirationDate", value: dateFilter(order.visaExpirationDate ,'yyyy-MM-dd')  },
				{ key: "card.order.visaScan", value:  order.visaScan ? fileUrl + order.visaScan : noImage, type: 'image' },
				{ key: "grid.description", value: order.description }
			]}
			/*,
			{ grpTitle: utilityService.itranslate('card.order.paymentInfo'), items: [
				{ key: "Gateway", value: 'N/A' },
				{ key: "Amount", value: 'N/A' },
				{ key: "Currency", value: 'N/A' },
				{ key: "grid.status", value: utilityService.itranslate( 'card.order.status.'+order.status),
					class: {
								'label cell-label': true,
								'label-warning': order.status == constants.enums.orderStatus.UNPAID,
								'label-info': order.status == constants.enums.orderStatus.PAID,
								'label-success': order.status == constants.enums.orderStatus.ISSUED,
								'label-danger': order.status == constants.enums.orderStatus.REJECTED
							}
				},
			]}
			*/);

		}
	}
})();
