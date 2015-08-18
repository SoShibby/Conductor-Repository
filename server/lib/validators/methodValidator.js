MethodValidator = (function() {
    function validate(methodName, method) {
        var validDataTypes = ['string', 'integer', 'double', 'float', 'boolean', 'enum'];

        if (!DataTypeUtil.isString(methodName) || methodName.length === 0) {
            throw new Meteor.Error(400, 'Invalid method name. The name of the method cannot be empty.');
        }

        if (!DataTypeUtil.isObject(method)) {
            throw new Meteor.Error(400, 'Invalid method. The method must be an object.');
        }

        if (!DataTypeUtil.isObject(method.parameters)) {
            throw new Meteor.Error(400, 'Invalid method parameters. The method parameters must be an object.');
        }

        for (var parameterName in method.parameters) {
            var dataType = method.parameters[parameterName];

            if(!_.contains(validDataTypes, dataType)) {
                throw new Meteor.Error(400, 'Invalid data type in method parameter. No data type exist with the name "' + dataType + '"');
            }

            if(!DataTypeUtil.isString(parameterName) || parameterName.length === 0) {
                throw new Meteor.Error(400, 'Invalid method parameter name. The name of the parameter must be an non empty string.');
            }
        }
    }

    return {
        validate: validate
    }
}());