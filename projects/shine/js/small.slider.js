function SmallSlider(selector){
    this.selector = selector;
};

var p = SmallSlider.prototype;

p.init = function(){
    
    this.visibleElements = 6;
    this.offset = 0;
    this.ul = $(this.selector + " ul");
    this.li = $(this.selector + " ul li");
    this.elementWidth = this.li.width();
    this.elementsCount = this.li.size();    
    this.ul.width(this.elementWidth * this.elementsCount);
    
    this.listener();
};

p.listener = function(){
    var self = this;
    
    $(self.selector + ' .arrow.left').on('click', function(e){
        e.preventDefault();
        self.scrollLeft();
    });
    
    $(self.selector + ' .arrow.right').on('click', function(e){
        e.preventDefault();
        self.scrollRight();
    });
};

p.scrollLeft = function(){
    if(this.offset > 0)
    {
        this.offset--;
        var margin = this.elementWidth * this.offset;
        this.ul.animate({'margin-left': '-' +margin+ 'px'}, 400, function(){});
    }
};

p.scrollRight = function(){
    
    if(this.offset + this.visibleElements < this.elementsCount)
    {
        this.offset++;        
        var margin = this.elementWidth * this.offset;        
        this.ul.animate({'margin-left': '-' +margin+ 'px'}, 400, function(){});
    }
};