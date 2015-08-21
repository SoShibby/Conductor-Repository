angular.module('conductorRepository', ['angular-meteor', 'ui.router', 'angularModalService']);

angular.module('conductorRepository').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'client/views/search/search.ng.html',
                controller: 'search',
                resolve: {
                    'subscribe': [
                        '$meteor',
                        function($meteor) {
                            return $meteor.subscribe('componentGroups') && $meteor.subscribe('jarRepository');
                        }
                    ]
                }
            })
            .state('addComponentGroup', {
                url: '/add-component-group',
                templateUrl: 'client/views/addComponentGroup/addComponentGroup.ng.html',
                controller: 'addComponentGroup'
            })
    }
])