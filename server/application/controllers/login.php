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
				$json_reply["city"]=$user['city'];
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
		if(isset($output['id'])){
			$output["session_id"]=$this->user->generar_session_id($output['id']);
			$output["user_id"]=$output['id'];

		}
		
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
	public function recover_password($key)
	{
		$this->load->view('recover_password',$data);
	}
	public function recovery_pass()
	{
		$email= $this->input->post('email');
		
		$this->load->library('form_validation');
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$output = array('error' => false);
		if ($this->form_validation->run() == FALSE)
		{
			$output['error']=true;
			$output['message_error']='error';
			
		}
		else
		{
			$user=$this->user->verify_email($email);
			if ($user) {
				$string=$this->user->get_email_string($user['id']);
				$mensaje = 'Hemos recibido una notificación para un cambio de contraseña. Por favor introduce este código en tu aplicación:  '.$string;

				$email_from = $email;
				
				$headers = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

				$headers = 'From: golombiao@golombiao.com' . "\r\n" .
				    'X-Mailer: PHP/' . phpversion();
				// Send
				if(mail($email, 'Código de recuperación de contraseña Golombiao', $mensaje,$headers) ){
					$return['email_enviado']=true;
				    
				}else{
					$return['email_enviado']=false;
				}






			}else{
				$output['error']=true;
				$output['message_error']='Email no encontrado';

			}
			
		}
		echo json_encode($output);
		

	}
	public function recuperar_contra()
	{
		$code= $this->input->post('code');
		$password= $this->input->post('password');
		$ver_password= $this->input->post('ver_password');
		
		$this->load->library('form_validation');
		$this->form_validation->set_rules('code', 'codigo ', 'required');
		$this->form_validation->set_rules('password', 'la contraseña', 'required|min_length[3]');
		if ($this->form_validation->run() == FALSE)
		{
				$output['error']=true;
				$response = str_replace("<p>", "",validation_errors());
				$response = str_replace("</p>", "",$response);
				$output['message_error']=$response;
			


		}else{
			$row=$this->user->verify_code($code);
			if ($row) {
				$this->db->delete('cambiar_password', array('id_user' => $row['id_user'])); 
				
				$data=array("encrypted_password"=>hash( 'sha256', $password));
				$this->db->where('id', $row['id_user']);
				$this->db->update('users', $data);
				
				
				$output['error']=FALSE;
				$output['success_message']='password actualizado correctamente';
				$output['last']=$this->db->last_query();	

				
			
		
			
			}else{
				$output['error']=true;
				$output['message_error']='el codigo no existe';
			}

		}
		echo json_encode($output);
		

	}
 
	//

	

}

/* End of file login.php */
/* Location: ./application/controllers/login.php */