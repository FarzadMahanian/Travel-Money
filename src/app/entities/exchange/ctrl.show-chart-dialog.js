(function() {
'use strict';

	angular
		.module('bpApp')
		.controller('ShowChartDialogController', ShowChartDialogController);

	ShowChartDialogController.$inject = ['$scope', 'currentExchanges', 'exchangeService'];
	function ShowChartDialogController($scope, exchanges, exchangeService) {
		var currencyChart;
		$scope.exchanges = exchanges;
		$scope.updateCart = updateCart;
		$scope.chartData = {
			dateFrom: moment().subtract(1, 'weeks').toDate(),
			dateTo: moment().toDate()
		};


		activate();

		////////////////

		function generateChart(seriesData) {

			currencyChart = Highcharts.chart('currency-chart', {
				chart: {
					type: 'spline'
				},
				title: {
					text: ''
				},
				xAxis: {
					type: 'datetime',
					// dateTimeLabelFormats: {
					// 	month: '%e. %b',
					// 	year: '%b',
                    //
					// 	second: '%H:%M:%S',
					// 	minute: '%H:%M',
					// 	hour: '%H:%M',
					// 	day: '%e. %b',
					// 	week: '%e. %b',
					// 	month: '%b \'%y',
					// 	year: '%Y'
					// },
					title: {
						text: 'Date'
					}
				},
				yAxis: {
					title: {
						text: 'Rate Value (Rials)'
					},
					min: 0
				},
				tooltip: {
					// headerFormat: '<b>{series.name}</b><br>',
					pointFormat: '{point.y} Rials'
				},

				plotOptions: {
					spline: {
						marker: {
							enabled: true
						}
					},
					series: {
						animation: {
							duration: 3000
						}
					}
				},

				series: seriesData
			});
		}

		function activate() {

			exchangeService.getAllChartRates(0, 1000, 'irr', null, $scope.chartData.dateFrom, $scope.chartData.dateTo).then(function (result) {
				generateChart(result);
			});
		}

		function updateCart() {
			exchangeService.getAllChartRates(0, 1000, 'irr', null, $scope.chartData.dateFrom, $scope.chartData.dateTo).then(function (result) {
				currencyChart.destroy();
				generateChart(result);
			});
		}
	}
})();
