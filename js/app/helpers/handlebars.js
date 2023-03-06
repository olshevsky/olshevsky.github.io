define(['handlebars'], function(Handlebars){

    Handlebars.registerHelper('list', function(items) {

        var result = '';

        for(id in items){

            if(id == items.length - 1){
                result += items[id];
            }
            else{
                result += items[id] + ', ';
            }
        }

        return result;
    });

    Handlebars.registerHelper('class', function(items) {

        var result = '';

        for(id in items){

            if(id == items.length - 1){
                result += items[id];
            }
            else{
                result += items[id] + ' ';
            }
        }

        return result;
    });

    Handlebars.registerHelper('timeToYear', function(timestamp) {

        var date = new Date(timestamp);

        return date.getFullYear();
    });


    return Handlebars;
});