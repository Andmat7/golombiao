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
		$zone_team= $this->input->post('zone_team');
		$description= $this->input->post('descripcion');
		$ciudad= $this->input->post('ciudad');
		$output=$this->team->new_team($name,$departamento,$ciudad,$zone_team,$description,$this->_USER['id']);
		
		$json_reply["error"]=true;
		if($output){
					
			$team_id=$this->db->insert_id();
			$result=$this->team->add_user($this->_USER['id'],$team_id);
			if($result){
				$json_reply["name_team"]=$name;	
				$json_reply["team_id"]=$team_id;
				$json_reply["error"]=false;
		

			}
		}
		
		
		//$json_reply['message_error']="Email y password requeridos";
		echo json_encode($json_reply);
		//echo $output;
	}
	public function get_fromcity()
	{
		$id_city= $this->input->post('id_city');
		$output=$this->team->select_from_city($id_city);
		echo json_encode($output);
		
	}
	public function suscribe()
	{
		$team_id= $this->input->post('team_id');
		$result=$this->team->add_user($this->_USER['id'],$team_id);
			if($result){
				
				$json_reply["team_id"]=$team_id;
				$json_reply["error"]=false;
			}
		echo json_encode($json_reply);
	}


	public function verify_team()
	{
		
		$result=$this->team->verify_team($this->_USER['id']);


		echo json_encode($result);
	}

	public function get_players()
	{
		$team_id= $this->input->post('team_id');
		$result=$this->team->get_players($team_id);
		echo json_encode($result);
	}







}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */