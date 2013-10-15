<?php 
require(APPPATH.'libraries/REST_Controller.php');  
class Example_api extends REST_Controller {  

    function __construct()
    {

        parent::__construct();
        $this->load->model('user','',TRUE);
    }
 function user_get()  
    {  
        if(!$this->get('id'))  
        {  
            $this->response(NULL, 400);  
        }  
  
        $user = $this->user->get( $this->get('id') );  
          
        if($user)  
        {  
            $this->response($user, 200); // 200 being the HTTP response code  
        }  
  
        else  
        {  
            $this->response(NULL, 404);  
        }    
    }  
      
    function user_post()  
    {         
        $data = array('returned: '. $this->post('id'));  
        $this->response($data);  
    }  
  
    function user_put()  
    {         
        $data = array('returned: '. $this->put('id'));  
        $this->response($data);  
    }  
  
    function user_delete()  
    {  
        $data = array('returned: '. $this->delete('id'));  
        $this->response($data);  
    }  

} 



 ?>