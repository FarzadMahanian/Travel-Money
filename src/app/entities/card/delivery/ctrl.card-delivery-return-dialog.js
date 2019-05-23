(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('CardReturnDialogController', CardReturnDialogController);

	CardReturnDialogController.$inject = ['cardService', 'card'];
	function CardReturnDialogController(cardService, card) {
		var vm = this;
		vm.deliver = {};

		activate();

		////////////////

		function activate() { }
	}
})();
