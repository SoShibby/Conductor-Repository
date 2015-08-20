Meteor.publish('myProfile', function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                services: 0
            }
        });
    }
});

Meteor.publish('componentGroups', function() {
    return ComponentGroups.find();
});