(function () {
	'use strict';

	angular
		.module('bpApp')
		.controller('CardGroupOrderPassengersDialogController', CardGroupOrderPassengersDialogController);

	CardGroupOrderPassengersDialogController.$inject = ['groupOrder','NgTableParams'];

	function CardGroupOrderPassengersDialogController(groupOrder,NgTableParams) {
		var vm = this;
		vm.order = groupOrder;
		vm.tableParams = new NgTableParams({
			sorting: {
				creationDate: "desc"
			}
		}, {
			dataset: groupOrder.customers
		});

		activate();

		////////////////

		function activate() {}
	}
})();
