(function () {
	'use strict';

	angular
		.module('bpApp')
		.directive('navbar', navbar);

	navbar.$inject = ['utilityService', 'localeService','authenticationService','locationService'];
	function navbar(utilityService, localeService,authenticationService,locationService) {
		/*
		* Layout page navbar
		*/
		var directive = {
			link: link,
			replace: true,
			restrict: 'E',
			templateUrl: 'app/layout/navbar.html',
			scope: {
			}
		};
		return directive;

		function link(scope, element, attrs) {
			pushMenu("[data-toggle='offcanvas']");

			scope.locales = localeService.getSystemLocales();
			scope.changeLocale = changeLocale;
			scope.logout = function(){
				authenticationService.logout().then(function(){
					locationService.go('login');
				});
			}
		}

		function changeLocale(locale) {
			localeService.changeLocale(locale);
		};

		function pushMenu(toggleBtn) {

			//Enable sidebar toggle
			$(toggleBtn).on('click', function (e) {
				e.preventDefault();

				//Enable sidebar push menu
				if ($(window).width() > (767)) {
					if ($("body").hasClass('sidebar-collapse')) {
						$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
					} else {
						$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
					}
				}
				//Handle sidebar push menu for small screens
				else {
					if ($("body").hasClass('sidebar-open')) {
						$("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
					} else {
						$("body").addClass('sidebar-open').trigger('expanded.pushMenu');
					}
				}
				if ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-collapse')) {
					$('.sidebar').css("overflow", "visible");
					$('.main-sidebar').find(".slimScrollDiv").css("overflow", "visible");
				}
				if ($('body').hasClass('only-sidebar')) {
					$('.sidebar').css("overflow", "visible");
					$('.main-sidebar').find(".slimScrollDiv").css("overflow", "visible");
				};
			});

			$(".content-wrapper").click(function () {
				//Enable hide menu when clicking on the content-wrapper on small screens
				if ($(window).width() <= (767) && $("body").hasClass("sidebar-open")) {
					$("body").removeClass('sidebar-open');
				}
			});
		}
	}
})();
