(function () {
	'use strict';

	angular
		.module('bpApp')
		.factory('exchangeService', exchangeService);

	exchangeService.$inject = ['httpService','NgTableParams', 'utilityService','$q'];
	function exchangeService(httpService, NgTableParams, utilityService , $q) {
		var service = {
			getAllExchanges: getAllExchanges,
			getAllChartRates: getAllChartRates,
			updateRates: updateRates,
			fillExchangeListTableParams: fillExchangeListTableParams
		};

		return service;

		////////////////

		function fillExchangeListTableParams(scope, destCurrency) {
			var _data = [];
			scope.tableParams = new NgTableParams({
				sorting: {
					creationDate: "desc"
				}
			}, {
				dataset: _data
			});

			getAllExchanges(destCurrency).then(function (result) {
				_data.length = 0;
				for (var i=0; i<result.length; i++) {
					_data.push(result[i]);
				}
				scope.tableParams.reload();
			});

		}

		function getAllExchanges(destCurrency) {
			var url = utilityService.buildUrl('travelmoney/exchange/api/v1/rate/list', [{dest: destCurrency}]);
			return httpService.getObject(url);
		}

		function getAllChartRates(page, total, destCurrency, sourceCurrency, dateFrom, dateTo) {
			// console.log("DATE");
			// if (dateFrom == null) dateFrom = new Date();
			// console.log(dateFrom);
			var url = utilityService.buildUrl('travelmoney/exchange/api/v1/rate/history', [{
				source: sourceCurrency,
				dest: destCurrency,
				dateFrom: dateFrom,
				dateTo: dateTo,
				page: page,
				total: total
			}]);
			return httpService.postObject(url).then(function (result) {
				return convertChartData(result);
			});
		}

		function convertChartData(dtoData) {
			var chartData = {};
			angular.forEach(dtoData.content, function (item) {
				var serries = chartData[item.source.name];
				if (!serries) {
					serries = chartData[item.source.name] = [];
				}
				serries.push([new Date(item.creationDate).getTime(), item.rate]);
			});
			var highChartSerries =  [];
			var keys = Object.getOwnPropertyNames(chartData);
			angular.forEach(keys, function (item) {
				highChartSerries.push({
					name: item,
					data: chartData[item]
				});
			});

			return highChartSerries;
		}

		function updateRates(rateVM) {
			var rateDTO = nwmapper.map('ExchangeRateVM', 'ExchangeRateDTO', rateVM);
			return httpService.postObject('travelmoney/exchange/api/v1/rate/add', rateDTO);
		}

	}
})();
