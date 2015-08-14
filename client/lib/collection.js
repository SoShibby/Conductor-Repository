JarRepository = new FS.Collection("jarRepository", {
    stores: [new FS.Store.FileSystem("jars", {path: "/uploads"})]
});