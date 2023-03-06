var timer = {
    currentTimestamp: 0,
    runTime(){
        
    }
    
}


var guides = {
	scrollPercent: 0, //number which defines where scrollbar was positioned, and is useful to position it on same place after screen resize
	scrollTimerId: null,
	scrollTo: function(nodeId, instant){
		if(!$('#'+nodeId).offset()){ //just to be sure that element exists (is useful in content pages)
			window.location.href = '/#'+nodeId;
		};

		var offset0 = $(window).scrollTop();
		var offset1 = $('#'+nodeId).offset().top;

		if(instant){
			window.scrollTo(0, offset1);
			return;
		}else{
			guides.smoothScroll(offset0, offset1, 24);
		}
	},
	smoothScroll: function(offset0, offset1, intensity){ //intensity of scroll depending from distance from current pos to anchor
		var offset = offset0;
		var d, step;
		
		clearInterval(guides.scrollTimerId); //if user clicks navTool(or resizes window) before previous scroll ended
		
		guides.scrollTimerId = setInterval(function(){
			d = Math.abs(offset-offset1);

			if(d < 2){
				step = d;
			}else{
				step = d/intensity;
			}

			if(offset0 < offset1){
				offset = offset+step;
				window.scrollTo(0, offset);
			}else{
				offset = offset-step;
				window.scrollTo(0, offset);
			}

			if(offset == offset1){
				clearInterval(guides.scrollTimerId);
			}
		},1);
	}
}