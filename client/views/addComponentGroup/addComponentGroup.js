angular.module('conductorRepository')
    .controller('addComponentGroup', ['$scope', '$stateParams', '$meteor',
        function($scope, $stateParams, $meteor) {
            $scope.componentGroup = {
                options: '[\r\t{\r\t\t"name": "",\r\t\t"dataType": ""\r\t}\r]',
                components: '[\r\t{\r\t\t"name": "",\r\t\t"options": [\r\t\t\t{\r\t\t\t\t"name": "",\r\t\t\t\t"dataType": ""\r\t\t\t}\r\t\t],\r\t\t"properties": {\r\t\t\t"testPropertyName": {\r\t\t\t\t"value": "",\r\t\t\t\t"dataType": "",\r\t\t\t\t"enum": []\r\t\t\t}\r\t\t},\r\t\t"methods": {\r\t\t\t"testMethodName": {\r\t\t\t\t"parameters": {\r\t\t\t\t\t"testParameterName": "integer"\r\t\t\t\t}\r\t\t\t}\r\t\t}\r\t}\r]'
            }

            $scope.jars = $meteor.collection(JarRepository, false, JarRepository);
            $scope.fileUploads;

            $scope.addJar = function() {
                $('<input type="file">').bind("change", function(event) {
                    $scope.jars.save(event.target.files[0]).then(
                        function(data) {
                            console.log(data);
                            if (data == null || data.length == 0) {
                                alert("File upload failed.");
                            } else {
                                $scope.fileUploads = data;
                            }
                        },
                        function(error) {
                            alert("File upload failed. Error message: " + error);
                        });
                }).click();
            };

            $scope.addComponentGroup = function() {
                if($scope.fileUploads === null || $scope.fileUploads === undefined || $scope.fileUploads.length === 0) {
                    alert("You must upload a jar file containing the component group.");
                    return;
                }

                var componentGroup = jQuery.extend(true, {}, $scope.componentGroup);

                try {
                    componentGroup.options = JSON.parse(componentGroup.options);
                } catch (e) {
                    alert('Failed to parse component group options. Invalid JSON object.');
                    return;
                }

                try {
                    componentGroup.components = JSON.parse(componentGroup.components);
                } catch (e) {
                    alert('Failed to parse components. Invalid JSON object.');
                    return;
                }

                componentGroup.fileId = $scope.fileUploads[0]._id._id;

                $meteor.call('addComponentGroup', componentGroup).then(
                    function(data) {
                        alert('Successfully added component group!');
                    },
                    function(error) {
                        console.log(error);
                        alert('An error occured while adding component group. ' + error.reason);
                    });
            }
        }
    ]);