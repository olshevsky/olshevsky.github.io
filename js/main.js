'use strict';

requirejs.config({
    'baseUrl': 'js',
    'paths': {
        'app': './app',
        'jquery': [
            //'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min', //cdn
            './lib/jquery' //local fallback
        ],
        'jquery.ui' : [
            //'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min', //cdn
            './lib/jquery.ui' //local fallback
        ],
        'bootstrap': [
            //'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min', //cdn
            './lib/bootstrap' //local fallback
        ],
        'featherlight': [
            //'https://cdn.rawgit.com/noelboss/featherlight/1.2.0/release/featherlight.min', //cdn
            './lib/featherlight' //local fallback
        ],
        'featherlight.gallery': [
            //'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.gallery.min', //cdn
            './lib/featherlight.gallery' //local fallback
        ],
        'backbone': [
            //'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min', //cdn
            //'http://backbonejs.org/backbone-min', //cdn
            './lib/backbone' //local fallback
        ],
        'underscore': [
            //'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', //cdn
            './lib/underscore' //local fallback
        ],
        'handlebars': [
            //'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.amd.min', //cdn
            './lib/handlebars' //local fallback
        ],
        'text': [
            //'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min', //cdn
            './lib/requirejs.text' //local fallback
        ],
        'jquery.mixitup': [
            './lib/jquery.mixitup'
        ]
    },
    // specify dependencies for jQuery plugins that do not call define()
    'shim': {
        'bootstrap': ['jquery'],
        'jquery.mixitup': ['jquery'],
        'featherlight' : ['jquery'],
        'featherlight.gallery' : ['jquery', 'featherlight']
    }
});

// Load the main app module to start the app
requirejs(['jquery', 'app/app'], function($, App){

    var app = new App('#main');
        app.init();
});