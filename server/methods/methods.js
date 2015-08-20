Meteor.methods({
    addComponentGroup: function(componentGroup) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in to add a componet group.');
        }

        ComponentGroupValidator.validate(componentGroup);

        }

        componentGroup.org = this.userId;

        ComponentGroups.insert(componentGroup);
    }
});