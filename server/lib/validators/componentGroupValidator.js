ComponentGroupValidator = (function() {
    function validate(componentGroup) {
        if (!DataTypeUtil.isObject(componentGroup)) {
            throw new Meteor.Error(400, "Invalid component group. The componet group must be an object.");
        }

        if (!DataTypeUtil.isString(componentGroup.title) || componentGroup.title.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group title. The title cannot be empty.');
        }

        if (!DataTypeUtil.isString(componentGroup.description) || componentGroup.description.length === 0) {
            throw new Meteor.Error(400, 'Invalid component group description. The description cannot be empty.');
        }

        if (!DataTypeUtil.isString(componentGroup.name) || componentGroup.name.length === 0) {
            throw new Meteor.Error(400, "Invalid component group name. The name cannot be empty.");
        }

        if (!DataTypeUtil.isString(componentGroup.version) || componentGroup.version.length === 0) {
            throw new Meteor.Error(400, "Invalid component group version. The version id cannot be empty.");
        }

        console.log(Object.prototype.toString.call(componentGroup.options));
        if (!DataTypeUtil.isArray(componentGroup.options)) {
            throw new Meteor.Error(400, "Invalid component group options. The component group options must be an array.");
        }

        if (!DataTypeUtil.isArray(componentGroup.components)) {
            throw new Meteor.Error(400, "Invalid component group options. The component group options must be an array.");
        }

        componentGroup.options.forEach(function(option) {
            OptionValidator.validate(option);
        });

        componentGroup.components.forEach(function(component) {
            ComponentValidator.validate(component);
        });

        if (!JarRepository.findOne(componentGroup.fileId)) {
            throw new Meteor.Error(400, "No jar file exist with that id.");
        }
    }

    return {
        validate: validate
    }
}());