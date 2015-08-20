User = (function() {
    function isUserLoggedIn(userId){
        return userId !== null;
    }

    function isEmailVerified(userId){
        var user = Meteor.users.findOne({ $and: [
                                                { _id: userId },
                                                { 'emails.verified': true }
                                            ]});
        return user !== undefined;
    }

    function getUser(userId){
        var user = Meteor.users.findOne(userId);

        if(!user){
            throw new Meteor.Error(500, "No user exists with the userId '" + userId + "'");
        }

        return user;
    }

    function isEmailInUse(email){
        var existingEmail = Meteor.users.findOne({ 'emails.address': email });
        return existingEmail !== undefined;
    }

    function isValidEmailAddress(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return {
        isUserLoggedIn: isUserLoggedIn,
        isEmailVerified: isEmailVerified,
        getUser: getUser,
        isEmailInUse: isEmailInUse,
        isValidEmailAddress: isValidEmailAddress
    }
}());