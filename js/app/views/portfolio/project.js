define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!app/templates/portfolio/project.hbs',
    'app/helpers/handlebars',
    'featherlight.gallery'
], function ($, _, Backbone, Handlebars, projectTemplate) {

    'use strict';

    var ProjectView = Backbone.View.extend({

        el: '#portfolioWindow',

        template: Handlebars.compile(projectTemplate),

        events: {
            'click .portfolio-window-close': 'closeProject'
        },

        // project open speed
        slideSpeed: 350,

        // gallery auto show speed
        autoShowSpeed: 5000,

        // gallery setTimeout indexes
        timeouts: [],

        initialize: function () {

            this.listenTo(this.model, "change", this.render);
        },

        render: function () {

            var self = this;

            this.$el.stop(true,false).slideUp(this.slideSpeed, function(){
                this.$el.html(this.template(this.model.toJSON()));
                this.initGallery();
            }.bind(this)).slideDown(this.slideSpeed);

            return this;
        },

        initGallery: function(){

            var self = this;

            _.each(this.timeouts, function(n){
                clearTimeout(n);
            });

            // gallery auto slide
            this.$('.portfolio-gallery-img').each(function(i) {

                var img = $(this);

                $('.portfolio-gallery-img').removeClass('active');

                self.timeouts[i] = setTimeout(function() {
                    img.addClass('active');
                }, i * self.autoShowSpeed);
            });

            // lightbox init
            this.$('.portfolio-gallery-a').featherlightGallery({
                openSpeed: 300,
                closeIcon: '<i class="fa fa-times"></i>',
                previousIcon: '<i class="fa fa-chevron-left gallery-prev"></i>',
                nextIcon: '<i class="fa fa-chevron-right gallery-next"></i>',
                otherClose: 'i.fa-times'
            });
        },

        closeProject: function(e){
            e.preventDefault();
            this.$el.slideUp(this.slideSpeed, function(){
                this.model.clear({silent: true});
                Backbone.history.navigate('portfolio/0', {trigger: true});
            }.bind(this));
        }
    });

    return ProjectView;
});