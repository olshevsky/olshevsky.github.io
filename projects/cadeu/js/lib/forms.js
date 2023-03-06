/*
 *  id = element id
 *  text = default text
 */
function inputText(id, text)
{    
    var registerText;
    
    $('#'+id).focus( function()
    {
        registerText = $(this).val();
        this.value = '';
    });
    
    $('#'+id).focusout( function()
    {                                
        if(this.value == '')
        {
            this.value = text;
        }
    });
}
