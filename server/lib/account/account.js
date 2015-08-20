Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});

Accounts.onCreateUser(function(options, user) {
    user.org = options.org;
    return user;
});

Accounts.validateNewUser(function(user) {
    if (!DataTypeUtil.isString(user.org) || user.org.length === 0) {
        throw new Meteor.Error(400, 'Invalid user org. The org field cannot be empty.');
    }

    var validFilename = /^[0-9a-zA-Z.]+$/;
    if (!validFilename.test(user.org)) {
        throw new Meteor.Error(400, 'Invalid user org. The org field can only contain 0-9, a-z, A-Z and .');
    }

    if(user.emails === undefined || !User.isValidEmailAddress(user.emails[0].address)) {
        throw new Meteor.Error(400, 'Invalid email address.');
    }

    if(User.isEmailInUse(user.emails[0].address)) {
        throw new Meteor.Error('Email is already registered.');
    }

    return true;
});