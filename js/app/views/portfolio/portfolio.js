define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!app/templates/portfolio/main.hbs',
    'app/views/portfolio/project',
    'app/models/project',
    'jquery.mixitup',
    'bootstrap'
], function ($, _, Backbone, Handlebars, portfolioTemplate, ProjectView, Project) {

    'use strict';

    // Our overall **MainView** is the top-level piece of UI.
    var PortfolioView = Backbone.View.extend({

        el: '#portfolio',

        template: Handlebars.compile(portfolioTemplate),

        mainView: null,

        projectView: null,

        mixItUpDeferred: null,

        // project instance
        model: null,

        events: {
            'click .show-item': 'showProject'
        },

        initialize: function (options) {

            this.mainView = options.mainView;
            this.projects = options.projects;

            var self = this;

            this.projects.bind('update', function(){
                self.render();
            });

            this.projectView = new ProjectView({
                el: '#portfolioWindow',
                model: this.model
            });
        },

        render: function () {

            this.$el.html(this.template({
                projects: this.projects.toJSON()
            }));

            var self = this;

            this.mixItUpDeferred = new $.Deferred();

            // TODO fix mixItUp to dynamically added elements
            if(this.projects.length > 0) {

                var a = this.$('#portfolioFilters').mixItUp({
                    callbacks: {
                        onMixLoad: function(){
                            self.mainView.updatePos();
                            self.mixItUpDeferred.resolve();
                        }
                    }
                });
            }

            this.projectView.$el = this.$('#portfolioWindow');
            this.projectView.delegateEvents();

            return this.mixItUpDeferred;
        },

        showProject: function(e){

            var id = e.currentTarget.getAttribute('data-slug');
            Backbone.history.navigate('portfolio/'+id, {trigger: true});
        }
    });

    return PortfolioView;
});