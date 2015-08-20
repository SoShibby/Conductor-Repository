angular.module('conductorRepository').
directive('loginForm', function() {
    return {
        restrict: 'E',
        templateUrl: "client/views/login/login.ng.html",
        controller: ['$scope', '$meteor', 'ModalService', function($scope, $meteor, ModalService) {
            $meteor.subscribe('myProfile');

            $scope.login = function(username, password) {
                $meteor.loginWithPassword(username, password).then(
                    function(data) {
                        $scope.password = '';
                    },
                    function(error) {
                        alert('Unable to login. ' + error);
                    }
                );
            }

            $scope.signup = function() {
                ModalService.showModal({
                    templateUrl: "client/views/createAccount/createAccount.ng.html",
                    controller: "createAccount"
                });
            }

            $scope.logout = function() {
                Meteor.logout();
            }
        }]
    }
});