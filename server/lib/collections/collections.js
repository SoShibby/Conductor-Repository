JarRepository = new FS.Collection("jarRepository", {
    stores: [new FS.Store.FileSystem("jars", {path: "C:\\Users\\Henrik\\uploads"})]
});

ComponentGroups = new Meteor.Collection("componentGroups");