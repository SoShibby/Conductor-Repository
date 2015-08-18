Meteor.startup(function() {
  // Global configuration
  Api = new Restivus({
    prettyJson: true,
    apiPath: 'api/',
    defaultHeaders: {
      'Content-Type': 'application/json'
    }
  });

  Api.addRoute('search', {}, {
    post: {
      action: function(data) {
        var query = {};

        if (this.bodyParams.org) {
          query['org'] = {
            $regex: this.bodyParams.org
          };
        }

        if (this.bodyParams.name) {
          query['name'] = {
            $regex: this.bodyParams.name
          };
        }

        if (this.bodyParams.version) {
          query['version'] = {
            $regex: this.bodyParams.version
          };
        }

        if (this.bodyParams.components && this.bodyParams.components.name) {
          query['components.name'] = {
            $regex: this.bodyParams.components.name
          };
        }

        if (this.bodyParams.components && this.bodyParams.components.type) {
          query['components.type'] = {
            $regex: this.bodyParams.components.type
          };
        }

        return ComponentGroups.find(query).fetch();
      }
    }
  });

  Api.addRoute('download', {}, {
    post: {
      action: function(data) {
        if (!this.bodyParams.org || !this.bodyParams.name || !this.bodyParams.version) {
          throw new Meteor.Error(400, 'Missing parameters, you must specify "org", "name" and "version" for the file you want to download');
        }

        var query = {
          org: {
            $regex: this.bodyParams.org
          },
          name: {
            $regex: this.bodyParams.name
          },
          version: {
            $regex: this.bodyParams.version
          }
        };

        var componentGroup = ComponentGroups.findOne(query);

        if(!componentGroup) {
          throw new Meteor.Error(404, 'Couldn\'t find any jar file for download.');
        }

        var file = JarRepository.findOne(componentGroup.fileId);
        var fileDownloadURL = Config.serverIp + '/cfs/files/jarRepository/' + file._id + '/' + file.original.name;  // Let the cfs package handle the file download instead.

        this.response.writeHead(302, {
          'Location': fileDownloadURL
        });

        this.done();
        return {};
      }
    }
  });
});