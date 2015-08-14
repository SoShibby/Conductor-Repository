PropertyValidator = (function() {
    function validate(propertyName, property) {
        var validDataTypes = ["string", "integer", "double", "float", "boolean", "enum"];

        if (!DataTypeUtil.isString(propertyName) || propertyName.length === 0) {
            throw new Meteor.Error(400, "Invalid component name. The name of the component cannot be empty.");
        }

        if (!DataTypeUtil.isObject(property)) {
            throw new Meteor.Error(400, "Invalid property. The property must be an object.");
        }

        if (!DataTypeUtil.isString(property.dataType) || property.dataType.length === 0) {
            throw new Meteor.Error(400, "Invalid property data type. The data type of the property cannot be empty.");
        }

        if (!_.contains(validDataTypes, property.dataType)) {
            throw new Meteor.Error(400, "Invalid property data type. The data type of the property is not a valid data type.");
        }

        if (property.enum !== undefined && !DataTypeUtil.isArray(property.enum)) {
            throw new Meteor.Error(400, "Invalid property enum. The property enum must be undefined or an array.");
        }

        if (DataTypeUtil.isArray(property.enum)) {
            property.enum.forEach(function(enumValue) {
                if (!DataTypeUtil.isString(enumValue) || enumValue.length === 0) {
                    throw new Meteor.Error(400, "Invalid property enum. The enum value of the property must be a string and cannot be empty.");
                }
            })
        }

        if (!isValidValue(property.value, property.dataType, property.enum)) {
            throw new Meteor.Error(400, "Invalid property value. The value of the property is not the same as the property data type says it should be.");
        }
    }

    function isValidValue(value, dataType, enumArray) {
        switch(dataType) {
            case "string":
                return DataTypeUtil.isString(value);
            case "integer":
                return DataTypeUtil.isInt(value);
            case "double":
                return DataTypeUtil.isDouble(value);
            case "float":
                return DataTypeUtil.isFloat(value);
            case "boolean":
                return DataTypeUtil.isBoolean(value);
            case "enum":
                if(!DataTypeUtil.isArray(enumArray)) {
                    return false;
                }

                if(!_.contains(enumArray, value)) {
                    return false;
                }

                return true;
        }

        return false;
    }

    return {
        validate: validate
    }
}());