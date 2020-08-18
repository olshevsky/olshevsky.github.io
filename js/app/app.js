define([
    'backbone',
    './routers/router',
    './models/menu',
    './views/main',
    './collections/projects',
    './models/project',
    './contact'
    //'text',
    //'bootstrap'
], function(Backbone, Router, Menu, MainView, ProjectsCollection, Project, contactForm) {

    function App(selector){
        this.selector = selector;
    }

    App.prototype.selector = 'body';

    App.prototype.router = null;

    App.prototype.menu = null;

    App.prototype.mainView = null;

    App.prototype.activeProject = null;

    App.prototype.projects = null;

    App.prototype.init = function(){

        this.menu = new Menu();
        this.router = new Router({app: this});
        this.projects = new ProjectsCollection();
        this.activeProject = new Project();

        this.mainView = new MainView({
            el: this.selector,
            router: this.router,
            model: this.menu,
            projects: this.projects,
            activeProject: this.activeProject
        });

        this.projects.fetch().done(function(collection, status, response){
            this.mainView.render();
            contactForm.init(this.selector + ' #contact-form');
            Backbone.history.start({pushState: false});
        }.bind(this));
    }

    return App;
});