<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
	public $_USER;
	function __construct()
	{	
 		header('Access-Control-Allow-Origin: *'); 
 		header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS'); 
 		header('Access-Control-Allow-Headers: Content-Type, cache-control'); 
 		header("Cache-Control: no-cache, must-revalidate");
		//header('Content-Type: text/javascript; charset=UTF-8');
 		parent::__construct();
 		$this->load->model('user','',TRUE);
 		$this->load->helper('url');
 		$type= $this->uri->segment(1);
        
 		if (!($type=='login' || $type=='register')) {

			$this->_verifylogin();
			
 		}
        


 	}
 	public function _verifylogin()
 	{
 		
 		$email = $this->input->post('email');
 		$session_id= $this->input->post('session_id');

 		$user=$this->user->verify_id($email,$session_id	);

 		if ($user){
 			$this->_USER=$user;
 			
 			//echo json_encode($this->_USER);
 			//exit;
 		}
 		else {
 			$json_reply= array('success' => false, 'message_error'=>"Usuario no logueado");
 			echo json_encode($json_reply);
 			exit;
 		}




 	}
 }
 /* End of file MY_Controller.php */
 /* Location: ./application/core/MY_Controller.php */

