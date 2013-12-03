<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends MY_Controller {
	function __construct()
	{

		ini_set('display_errors', 'On');
		parent::__construct();
		$this->load->model('user','',TRUE);
	}
	public function index(){
		$email = $this->input->post('email');
		$encrypted_password = $this->input->post('encrypted_password');
		$json_reply=array();
		if (!$email || !$encrypted_password) {
			$json_reply["error"]=true;
			$json_reply['message_error']="Email y password requeridos";
		}else{
			$json_reply = array('email' => $email, 
				'error' =>  true,
				'session_id' => ''
				);

			$user = $this->user->login($email, $encrypted_password);


			if($user){
				$json_reply["session_id"]=$this->user->generar_session_id($user['id']);
				$json_reply["user_id"]=$user['id'];
				$json_reply["first_name"]=$user['first_name'];
				$json_reply["last_name"]=$user['last_name'];
				$json_reply["email"]=$user['email'];
				$json_reply["age"]=$user['age'];
				//$json_reply["subscription_expires"]=$user['subscription_expires'];
				$json_reply['error']=false;
			}else{
				$json_reply['message_error']='usuario y contraseña inválidos';
			}
		}
		echo json_encode($json_reply);

	}
	public function verify_registerfb()
	{
		$fb_id=$this->input->post('fb_id');
		$email=utf8_encode($this->input->post('email'));
		$output=$this->user->verify_register($email,$fb_id);
		$output["session_id"]=$this->user->generar_session_id($output['id']);
		$output["user_id"]=$output['id'];
		echo json_encode($output);


	}

	public function newuser()
	{
		$first_name= $this->input->post('first_name');
		$last_name= $this->input->post('last_name');
		$age= $this->input->post('age');
		$gender= $this->input->post('gender');
		$email= $this->input->post('email');
		$city= $this->input->post('city');
		$departamento= $this->input->post('departamento');
		$study= $this->input->post('study');
		$school_level= $this->input->post('school_level');
		$encrypted_password= $this->input->post('encrypted_password');
		$fb_id= $this->input->post('fb_id');
		if ($fb_id==null||$fb_id==" ") {
			$fb_id=0;
						
				}	
		$output=$this->user->new_user($first_name,$last_name,$age,$gender,$email,$city,$study,$school_level,$encrypted_password,$departamento,$fb_id);
		if($output){
			$json_reply["error"]=false;

		}else{
			$json_reply["error"]=true;
			$json_reply['message_error']="Email ya registrado";

		}
		echo json_encode($json_reply);
		
	}

	public function select_city()
	{		

		$id= $this->input->post('departamento');
		$output=$this->user->sel_city($id);

			echo json_encode($output);
	}
	

	

}

/* End of file login.php */
/* Location: ./application/controllers/login.php */