define([
    'backbone',
    '../models/project'
], function (Backbone, Project) {

    'use strict';

    var ProjectsCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Project,

        url: './server/data.json',
    });

    return ProjectsCollection;
});