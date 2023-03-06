define(['jquery', 'jquery.ui'], function() {

    var contactForm = {

        selector: null,
        form: null,
        emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        successMsg: 'Your message has been sent successfully',
        errorMsg: 'Opps, something went wrong',

        init: function(selector){
            this.selector = selector;
            this.form = $(this.selector);
            this.eventsListener();
        },

        eventsListener: function(){

            var self = this;

            this.form.submit(function(e) {

                e.preventDefault();

                var email = self.form.find('.form-email');
                self.form.find('.info-message').html('').removeClass('send-success').removeClass('send-error');

                if(self.emailRegex.test(email.val()))
                {
                    var data = {
                        email: email.val(),
                        name: self.form.find('.form-name').val(),
                        message: self.form.find('.form-message').val()
                    };

                    self.sendMessage(data);
                }
                else
                {
                    email.addClass('form-error').parent('div').effect( "shake", {times:2}, 400);
                }
            });
        },

        sendMessage: function(data){

            var self = this;

            $.ajax({
                type: "POST",
                url: self.form.attr('action'),
                data: data,
                dataType: "json",
                cache: false,
                success: function(response)
                {
                    if(response.status === 1)
                    {
                        self.clear();
                        self.form.find('.info-message').addClass('send-success').html(self.successMsg);
                    }
                    else
                    {
                        self.form.find('.info-message').addClass('send-error').html(self.errorMsg);
                    }
                },
                error: function(){
                    self.form.find('.info-message').addClass('send-error').html(self.errorMsg);
                }
            });

        },

        clear: function(){
            this.form.find('.form-name').val('').removeClass('form-error');
            this.form.find('.form-email').val('').removeClass('form-error');
            this.form.find('.form-message').val('').removeClass('form-error');
        }
    };

    return contactForm;
});