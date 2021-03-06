angular.module('conductorRepository')
    .controller('search', ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {
            $scope.files = JarRepository.find().fetch();
            $scope.searchQuery = '';

            $scope.$watch('query', function() {
                if (!$scope.query) {
                    return;
                }

                var queryParts = $scope.query.split(' ');

                $scope.searchQuery = '';

                _.each(queryParts, function(queryPart, index) {
                    if (index === 0) {
                        $scope.searchQuery += '(?=.*' + queryPart + '.*)';
                    } else {
                        $scope.searchQuery += '(?=.*' + queryPart + '.*)';
                    }
                })
            });

            $scope.componentGroups = $meteor.collection(function() {
                return ComponentGroups.find({
                    package: {
                        $regex: $scope.getReactively('searchQuery')
                    }
                });
            });

            $scope.download = function(componentGroup) {
                var file = JarRepository.findOne(componentGroup.fileId);

                if (!file) {
                    alert('Couldn\'t find the file in the repository. Please report this to the site administrator.');
                    return;
                }

                var url = '/cfs/files/jarRepository/' + file._id + '/' + file.original.name;
                window.open(url, '_blank');
            }
        }
    ]);