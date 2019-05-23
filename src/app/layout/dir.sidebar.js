(function () {
    'use strict';

    angular
        .module('bpApp')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['moduleRegisteryService'];
    function sidebar(moduleRegisteryService) {
        /*
        * Layout page sidebar
        */
        var directive = {
            link: link,
            replace: true,
            restrict: 'E',
            templateUrl: 'app/layout/sidebar.html',
            controller: Controller,
            scope: '='
        };
        return directive;

        function link(scope, element, attrs) {

				scope.menuitems = moduleRegisteryService.getSidebarMenuItems().sort(function (a,b) {
					return a.order-b.order;
				});

            tree('.sidebar');

            // Navbar height : Using slimscroll for sidebar
            if ($('body').hasClass('fixed') || $('body').hasClass('only-sidebar')) {
                $('.sidebar').slimScroll({
                    height: ($(window).height() - $(".main-header").height()) + "px",
                    color: "rgba(0,0,0,0.8)",
                    size: "3px"
                });
            }
            else {
                var docHeight = $(document).height();
                $('.main-sidebar').height(docHeight);
            }
        }

        function tree(menu) {
			  if ($(document).data("tree")) return;
			  $(document).data("tree", true);
            var _this = this;
            var animationSpeed = 200;
            $(document).on('click', menu + ' li a', function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp(animationSpeed, function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown(animationSpeed, function () {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        }

    }

    Controller.$inject = ['$scope','$rootScope','locationService','authenticationService'];
    function Controller($scope,$rootScope,locationService,authenticationService) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $scope.currentStateName = toState.name;
        });
    }


})();
