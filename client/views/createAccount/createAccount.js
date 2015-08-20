angular.module('conductorRepository')
    .controller('createAccount', ['$scope', '$stateParams', '$meteor', 'close',
        function($scope, $stateParams, $meteor, close) {
            $scope.close = close;

            $scope.createAccount = function(account) {
                console.log(account);

                $meteor.createUser(account).then(
                    function(data) {
                        $scope.account = {};
                        close();
                    },
                    function(error) {
                        alert('Unable to create account. ' + error);
                    }
                );
            }
        }
    ]);