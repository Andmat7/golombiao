<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Teams extends MY_Controller {
	function __construct()
	{

		ini_set('display_errors', 'On');
		parent::__construct();
		$this->load->model('team','',TRUE);
	}

	public function new_team()
	{
		$name= $this->input->post('name');
		$departamento= $this->input->post('departamento');
		$city= $this->input->post('city');
		
		$zone_team= $this->input->post('zone_team');
		$description= $this->input->post('descripcion');

		
		$output=$this->team->new_team($name,$departamento,$city,$zone_team,$description,$this->_USER['id');
		$json_reply["error"]=false;
		//$json_reply['message_error']="Email y password requeridos";
		echo json_encode($json_reply);
		//echo $output;
	}



}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */