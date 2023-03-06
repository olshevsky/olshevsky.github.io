define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!app/templates/main.hbs',
    '../collections/projects',
    './portfolio/portfolio'
], function ($, _, Backbone, Handlebars, mainTemplate, ProjectsCollection, PortfolioView){

    'use strict';

    // Our overall **MainView** is the top-level piece of UI.
    var MainView = Backbone.View.extend({

        el: null,

        template: Handlebars.compile(mainTemplate),

        events: {
            'click a.menu-controls': 'onNav'
        },

        model: null, // menu instance

        portfolioView: null,

        projects: null,

        activeProject: null,

        scrollSpeed: 400,

        $window: null,

        $root: null,

        mixItUpDeferred: null,

        initialize: function(options){

            this.$root = $('html, body');
            this.$window = $(window);
            this.projects = options.projects;
            this.activeProject = options.activeProject;
            this.mixItUpDeferred = new $.Deferred();

            this.portfolioView = new PortfolioView({
                mainView: this,
                projects: this.projects,
                model: this.activeProject,
                mixItUpDeferred: this.mixItUpDeferred
            }).bind(this);

            this.listenTo(this.model, 'change', this.update);
            this.listenTo(this.model, 'change:active', this.scrollToActive);

            $(window).on('scroll', this.onScroll.bind(this));
            $(window).on('resize', this.updatePos.bind(this));
        },

        render: function(){

            this.$el.html(this.template());
            this.portfolioView.$el = this.$('#portfolio');
            this.mixItUpDeferred = this.portfolioView.render();
            this.portfolioView.delegateEvents();
            this.updatePos();
            this.displayNav();
            this.displayArrow();
            this.markNav();
        },

        update: function(){

            this.displayNav();
            this.displayArrow();
            this.markNav()
        },

        scrollToActive: function(){

            this.scrollTo(this.model.getActivePos());

        },

        onScroll: function(){
            this.model.set('offset', this.$window.scrollTop());
        },

        onNav: function(e){
            e.preventDefault();

            var hash = $(e.currentTarget).attr('href');
            var route = hash.replace('#','');

            this.scrollToEl(hash).done(function(){
                Backbone.history.navigate(route, {trigger: false});
            });
        },

        scrollToEl: function(selector){

            var to = (selector) ? $(selector).offset().top : 0;

            return this.$root.animate({
                scrollTop: to
            }, 400).promise();
        },

        scrollTo: function(to){

            return this.$root.animate({
                scrollTop: to
            }, 400).promise();
        },

        markNav: function(){
            $('#nav li').removeClass('active');
            $('#nav-'+this.model.getActiveUrlHash()).addClass('active');
        },

        displayNav: function(){

            if(this.model.get('offset') > 350)
                this.$('#nav-bar').addClass('fade-in');
            else
                this.$('#nav-bar').removeClass('fade-in');
        },

        displayArrow: function(){

            if(this.model.get('offset') > 500)
                this.$('#bottom-arrow').fadeIn();
            else
                this.$('#bottom-arrow').fadeOut();
        },

        updatePos: function(){

            this.model.set({
                offset:         this.$window.scrollTop(),
                positions: {
                    about:      document.getElementById('about').offsetTop,
                    portfolio:  document.getElementById('portfolio').offsetTop,
                    contacts:   document.getElementById('contacts').offsetTop
                }
            });
        },
    });

    return MainView;
});