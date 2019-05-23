(function () {
	'use strict';

	angular
		.module('bpApp')
		.constant('constants', {
			"enums": {
				"statusType": {
					"CONFIRM": "Confirm",
					"REJECTED": "Rejected",
					"PENDING": "Pending"
				},
				"actionType":{
					"CREATE": "Create",
					"UPDATE": "Update",
					"DELETE": "Delete"
				},
				"authorizationStatus" :{
					"ACTIVATED" : 0,
					"UNACTIVATED" : 6045,
					"NOTTMUSER" : 6044
				},
				"orderStatus":{
					"PAID":"PAID",
					"UNPAID": "UNPAID",
					"ISSUED":"ISSUED",
					"REJECTED":"REJECTED"
				},
				"userStatus" : {
					"UNVERIFIED": "UNVERIFIED",
					"ACTIVE": "ACTIVE"
				},
				"paymentStatus": {
					"SUCCESS": "SUCCESS",
					"FAILURE": "FAILURE",
					"CANCEL": "CANCEL", //TODO: Davood says this is redendant
					"PENDING": "PENDING"
				},
				"cardStatus": {
					"ISSUED": "ISSUED",
					"DELIVERED": "DELIVERED",
					"HOT": "HOT"
				},
				"groupOrderStatus": {
					"FINALIZED": "FINALIZED",
					"DRAFT": "DRAFT"
				}
			}
		});;
})();
