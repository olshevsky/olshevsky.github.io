define([
    'jquery',
    'backbone',
    '../models/menu',
    '../views/main',
    '../collections/projects',
    '../models/project'
], function($, Backbone, Menu, MainView, ProjectsCollection, Project) {

    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            '':                     'index',         // index
            'about':                'about',         // #about
            'portfolio':            'portfolio',     // #portfolio
            'portfolio/:item':      'portfolioItem', // #portfolio/1
            'contacts':             'contacts',      // #contact
        },

        app: null,

        initialize: function(options){
            this.app = options.app;
        },

        index: function(){

        },

        about: function(){

            this.app.mainView.scrollToEl('#about');
        },

        portfolio: function(){

            this.app.mainView.scrollToEl('#portfolio');
        },

        portfolioItem: function(item){

            this.app.mainView.scrollToEl('#portfolio').done(function(){

                var project = this.app.projects.findWhere({slug: item});

                if(project)
                    this.app.activeProject.set(project.toJSON());
            }.bind(this));
        },

        contacts: function(){

            var self = this;

            this.app.mainView.mixItUpDeferred.done(function(){
                self.app.mainView.scrollToEl('#contacts');
            });
        }
    });

    return Router;
});