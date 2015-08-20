Meteor.methods({
    addComponentGroup: function(componentGroup) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in to add a componet group.');
        }

        ComponentGroupValidator.validate(componentGroup);

        componentGroup.org = User.getUser(this.userId).org;

        var existComponentGroup = ComponentGroups.findOne({
            org: componentGroup.org,
            name: componentGroup.name,
            version: componentGroup.version
        });

        if (existComponentGroup) {
            throw new Meteor.Error(400, 'A component group already exist with the same org, name and version.');
        }

        componentGroup.org = this.userId;

        ComponentGroups.insert(componentGroup);
    }
});