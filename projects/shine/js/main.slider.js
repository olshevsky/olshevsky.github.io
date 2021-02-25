function Slider(selector){
    this.selector = selector;
};

var p = Slider.prototype;

p.init = function(){
    this.windowWidth = $(window).width();
    this.slideCount = $(this.selector + " ul.items li").size();
    $('body').width(this.windowWidth);
    this.sizes();
    this.listener();
};

p.sizes = function(){
    $(this.selector+' ul.items').width(this.slideCount*990);
};

p.scrollTo = function(position){
    if(!position) position = 0;
    var margin = position*990;
    var self = this;
    
    $(self.selector + ' .items').animate({'margin-left': '-'+margin+'px'}, 400, function(){});
};

p.listener = function(){
    var self = this;
    $(self.selector+' .controls a').on('click', function(e){
        e.preventDefault();
        $(self.selector + " ul.controls li a").removeClass('selected');
        $(this).addClass('selected');
        self.scrollTo($(this).attr('attr'));
    });
};