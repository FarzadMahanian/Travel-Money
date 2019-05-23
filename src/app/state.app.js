(function () {
    'use strict';

    angular
        .module('bpApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider'
		  , function ($stateProvider, $urlRouterProvider, $locationProvider) {

            // For any unmatched url, redirect to /dashboard
            $urlRouterProvider.otherwise("/dashboard");
				$locationProvider.html5Mode(true);

            $stateProvider
                .state('app', {
                    url: '',
                    templateUrl: 'app/root.html',
                    controller: 'RootController',
                    resolve: {
                        systemLocales: ['localeService', function (localeService) {
                            return localeService.getSystemLocalesAsync();
                        }],
                        generalData: ['generalDataService','$q', function (generalDataService, $q) {
                            return $q.all([
                                generalDataService.getSystemCurrencies(),
                                generalDataService.getPersonalTitles(),
                                generalDataService.getPersonalGenders(),
                                generalDataService.getSecurityQuestions(),
                                generalDataService.getCountries()
									 ]);
                        }]
                    },
                    abstract: true
                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController'
                });

        }]);
})();
