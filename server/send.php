<?php
    
    $response = array('status' => 0);
    
    //get and clear sender's email
    $from = (isset($_POST['email'])) ? preg_replace('=((<CR>|<LF>|0x0A/%0A|0x0D/%0D|\\n|\\r)\S).*=i', NULL, $_POST['email']) : NULL;
    
    if($from !== NULL && filter_var($from, FILTER_VALIDATE_EMAIL))
    {
        //get and clear sender's name and msg
        $name = (isset($_POST['name'])) ? preg_replace('=((<CR>|<LF>|0x0A/%0A|0x0D/%0D|\\n|\\r)\S).*=i', NULL, $_POST['name']) : NULL;
        $message = (isset($_POST['message'])) ? preg_replace('=((<CR>|<LF>|0x0A/%0A|0x0D/%0D|\\n|\\r)\S).*=i', NULL, $_POST['message']) : NULL;
        
        $to = 'artur.olshevsky@gmail.com';
        $subject = 'Arturs.net message from '.$name.'('.$from.')';
    
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'To: '.$to.'\r\n';
        $headers .= 'From: '.$from.'\r\n';
        $headers .= 'Reply-To: '.$to.'\r\n';    
        $headers .= 'X-Mailer: PHP/'. phpversion().'\r\n';            
    
        $result = mail($to, $subject, $message, $headers);
        
        if($result)
        {
            $response['status'] = 1;
        }
    }
    
    echo json_encode($response);
?>