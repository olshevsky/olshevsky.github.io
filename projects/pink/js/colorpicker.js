(function($){
	var initColorPickers = function() {
            
		var hash = window.location.hash.replace('#', '');
                
		var currentTab = $('ul.navigationTabs a')
                                .bind('click', showTab)
                                .filter('a[rel=' + hash + ']');
		if (currentTab.size() == 0) {
                    currentTab = $('ul.navigationTabs a:first');
		}
                
		showTab.apply(currentTab.get(0));
                
		$('.colorpicker_holder').ColorPicker({
			flat: true,
			color: '#8f3aff',
			onSubmit: function(hsb, hex, rgb, el) 
                        {
                            custom_widget = $(el).parent();
                            custom_widget.find('div.color_selector').find('div').css('backgroundColor', '#' + hex);
                            custom_widget.children('input').attr('value', '#'+hex);
			}
		});
                
		var widt = false;
                
		$('.color_selector').bind('click', function()
                {
                    var selector_div = $(this).children('div');
                    
                    if(selector_div.hasClass('active')){
                        selector_div.removeClass('active');
                    }
                    else{
                        selector_div.addClass('active');
                    }
                    
                    $(this).next('.colorpicker_holder').stop().animate({height: widt ? 0 : 173}, 300);
                    widt = !widt;
		});  
	};
	
	var showTab = function(e)
                      {
                        var tabIndex = $('ul.navigationTabs a')
                            .removeClass('active')
                            .index(this);
                        $(this)
                            .addClass('active')
                            .blur();
                        $('div.tab')
                            .hide()
                            .eq(tabIndex)
                            .show();
                      };
	
	EYE.register(initColorPickers, 'init');
        
})(jQuery)