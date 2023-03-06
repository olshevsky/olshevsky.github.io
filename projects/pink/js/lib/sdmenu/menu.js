/**
* sideMenu
*
* main side menu object
*
* @param 
* @return
*/
var sideMenu = {

    id : 'sideMenu',    // div id
    speed : 300,        // animation speed
    type : 'slide',     // animation type
    openOne : true,     // one opened menu at time
    
    /**
    * init
    *
    * initilize menu
    *
    * @param (string) (id) div id
    * @return (boolean) result
    */
    init: function(id){
        
        // exit if div doesn't exist
        if (id != undefined) this.id = id; else return false;
        
        this.markExpandable();
        
        $('#'+this.id+' a').click(function(){
            
            liParent = $(this).parent('li');
            
            // close current level (if it isn't expandable do nothing)
            if (liParent.hasClass('active') && liParent.hasClass('expandable')){
                
                liParent.removeClass('active');
                liParent.children('li').removeClass('active');
            }
            //open next level
            else{
                
                if(sideMenu.openOne){
                    sideMenu.closeAll(false);
                    sideMenu.addActiveUp(liParent);
                    liParent.addClass('active');
                }
                else{
                    liParent.addClass('active');
                }
            }
        }); 
    },

    /**
    * closeAll
    *
    * close all submenus
    *
    * @param (boolean) useAnimation - use animation or not
    * @return
    */
    closeAll: function(useAnimation){
        
        // use false if doesn't set
        useAnimation = (useAnimation != undefined) ? useAnimation : false;
        
        if (useAnimation){
            $('#'+this.id+' > ul li').removeClass('active');
        }
        else{
            $('#'+this.id+' > ul li').removeClass('active');
        }
    },
    
    /**
    * addActiveUp
    *
    * add class active to parents up to tree
    *
    * @param
    * @return (boolean) result
    */
    addActiveUp: function(liParent){
        
        liParent.parents('li').addClass('active');
    },
    
    /**
    * markExpandable
    *
    * add class = "expandable" to each li witch have child ul
    *
    * @param
    * @return (boolean) result
    */
    markExpandable: function(){
        
        $('#'+this.id+' ul li').each(function(){
            $(this).has('ul').addClass('expandable');
        });
    },
    
    /**
    * menuAnimation
    *
    * set menu animation type and speed
    *
    * @param (integer) speed, (string) type
    * @return (boolean) result
    */
    menuAnimation: function(){
        
    }
}