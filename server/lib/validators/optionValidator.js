OptionValidator = (function() {
    function validate(option) {
        var validDataTypes = ['string', 'integer', 'double', 'float', 'boolean', 'enum'];

        if (!DataTypeUtil.isString(option.name) || option.name.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group option. The name of the option cannot be empty.');
        }

        if (!DataTypeUtil.isString(option.dataType) || option.dataType.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group option. The name of the option data type cannot be empty.');
        }

        if (!_.contains(validDataTypes, option.dataType)) {
            throw new Meteor.Error(400, 'Invalid component group option. The data type of the option is not a valid data type.');
        }
    }

    return {
        validate: validate
    }
}());