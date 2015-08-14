Meteor.methods({
    addComponentGroup: function(componentGroup) {
        console.log(componentGroup);
        ComponentGroupValidator.validate(componentGroup);

        if(!this.userId) {
            throw new Meteor.Error(401, "You must be logged in to add a componet group.");
        }

        componentGroup.org = this.userId;

        ComponentGroups.insert(componentGroup);
    }
});