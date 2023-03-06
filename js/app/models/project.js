define(['backbone'], function(){

    var Project = Backbone.Model.extend({

        initialize: function() {

        },

        defaults: {
            id: null,
            title: null,
            job: null,
            tags: [],
            url: null,
            urlTitle: null,
            description: null,
            gallery: [],
            timestamp: 0
        }
    });

    return Project;
});