angular.module('conductorRepository')
    .controller('search', ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {
            $scope.files = JarRepository.find().fetch();
        }
    ]);