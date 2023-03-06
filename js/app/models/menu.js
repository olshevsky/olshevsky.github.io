define(['backbone'], function(){

    var Menu = Backbone.Model.extend({

        initialize: function() {

        },

        defaults: {
            offset: 0,
            positions:{
                home: 0,
                about: 0,
                portfolio: 0,
                contacts: 0
            },
            speed: 10,
            active: 'home' //active anchor
            //interval: null,
        },

        getActiveUrlHash: function(){

            if(this.get('offset') >= this.get('positions').contacts)
            {
                return 'contacts';
            }
            else if(this.get('offset') >= this.get('positions').portfolio)
            {
                return 'portfolio';
            }
            else if(this.get('offset') >= this.get('positions').about)
            {
                return 'about';
            }
            else{
                return 'home';
            }
        },

        getActivePos: function(){

            return (this.get('positions')[this.get('active')]) ? this.get('positions')[this.get('active')] : 0;
        },

        updateActive: function(){
            this.set('active', this.getActiveUrlHash());
        }
    });

    return Menu;
});