ComponentGroupValidator = (function() {
    function validate(componentGroup) {
        if (!DataTypeUtil.isObject(componentGroup)) {
            throw new Meteor.Error(400, 'Invalid component group. The componet group must be an object.');
        }

        if (!DataTypeUtil.isString(componentGroup.title) || componentGroup.title.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group title. The title cannot be empty.');
        }

        if (!DataTypeUtil.isString(componentGroup.description) || componentGroup.description.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group description. The description cannot be empty.');
        }

        if (!DataTypeUtil.isString(componentGroup.name) || componentGroup.name.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group name. The name cannot be empty.');
        }

        var validFilename = /^[0-9a-zA-Z.]+$/;
        if (!validFilename.test(componentGroup.name)) {
            throw new Meteor.Error(400, 'Invalid component group name. The component group name can only contain 0-9, a-z, A-Z and .');
        }

        if (!DataTypeUtil.isString(componentGroup.version) || componentGroup.version.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group version. The version id cannot be empty.');
        }

        var validVersionNumber = /^[0-9.]+$/;
        if (!validVersionNumber.test(componentGroup.version)) {
            throw new Meteor.Error(400, 'Invalid component group version. The version id can only contain 0-9 and .');
        }

        if (!DataTypeUtil.isArray(componentGroup.options)) {
            throw new Meteor.Error(400, 'Invalid component group options. The component group options must be an array.');
        }

        if (!DataTypeUtil.isArray(componentGroup.components)) {
            throw new Meteor.Error(400, 'Invalid component group options. The component group options must be an array.');
        }

        componentGroup.options.forEach(function(option) {
            OptionValidator.validate(option);
        });

        componentGroup.components.forEach(function(component) {
            ComponentValidator.validate(component);
        });

        if (!JarRepository.findOne(componentGroup.fileId)) {
            throw new Meteor.Error(400, 'No jar file exist with that id.');
        }
    }

    return {
        validate: validate
    }
}());