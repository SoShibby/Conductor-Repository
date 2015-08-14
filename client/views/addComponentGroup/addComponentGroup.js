angular.module('conductorRepository')
    .controller('addComponentGroup', ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {
            $scope.componentGroup = {
                options: '[\r\t{\r\t\t"name": "",\r\t\t"dataType": ""\r\t}\r]',
                components: '[\r\t{\r\t\t"name": "",\r\t\t"options": [\r\t\t\t{\r\t\t\t\t"name": "",\r\t\t\t\t"dataType": ""\r\t\t\t}\r\t\t],\r\t\t"properties": {\r\t\t\t"testPropertyName": {\r\t\t\t\t"value": "",\r\t\t\t\t"dataType": "",\r\t\t\t\t"enum": []\r\t\t\t}\r\t\t},\r\t\t"methods": {\r\t\t\t"testMethodName": {\r\t\t\t\t"parameters": {\r\t\t\t\t\t"testParameterName": "integer"\r\t\t\t\t}\r\t\t\t}\r\t\t}\r\t}\r]'
            }
        }
    ]);