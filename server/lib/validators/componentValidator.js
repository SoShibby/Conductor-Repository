ComponentValidator = (function() {
    function validate(component) {
        if (!DataTypeUtil.isString(component.name) || component.name.length === 0) {
            throw new Meteor.Error(400, 'Invalid component name. The name of the component cannot be empty.');
        }

        if (!DataTypeUtil.isString(component.type) || component.type.length === 0) {
            throw new Meteor.Error(400, 'Invalid component type. The type of the component cannot be empty.');
        }

        if (!DataTypeUtil.isArray(component.options)) {
            throw new Meteor.Error(400, 'Invalid component options. The component options must be an array.');
        }

        component.options.forEach(function(option) {
            OptionValidator.validate(option);
        });

        if(!DataTypeUtil.isObject(component.properties)) {
            throw new Meteor.Error(400, 'Invalid component properties. The component properties must be an object.');
        }

        if(!DataTypeUtil.isObject(component.methods)) {
            throw new Meteor.Error(400, 'Invalid component methods. The component methods must be an object.');
        }

        for (var propertyName in component.properties) {
            PropertyValidator.validate(propertyName, component.properties[propertyName]);
        }

        for(var methodName in component.methods) {
            MethodValidator.validate(methodName, component.methods[methodName]);
        }
    }

    return {
        validate: validate
    }
}());