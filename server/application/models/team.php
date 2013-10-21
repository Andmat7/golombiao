<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class team extends CI_Model {





	public function new_team($name,$departamento,$ciudad,$zone_team,$descripcion,$user_id){
		$data = array(
			'name'=>$name,
			'departamento'=>$departamento,
			'zone_team'=>$zone_team,
			'ciudad'=>$ciudad,
			'description'=>$descripcion,			
			'leader_id'=>$user_id,
			);
		$this->db->insert('teams',$data);
		return true;
	}
	public function add_user($id_user,$id_team)
	{
		$this->db->delete('users_teams', array('id_user' => $id_user));
		$data = array(
			'id_user'=>$id_user,
			'id_team'=>$id_team,			
			);
		$this->db->insert('users_teams',$data);
		return true;
	}

	public function select_from_city($id_city)
	{
		$this->db->where('ciudad', $id_city);
		$q = $this->db->get('teams');
		$cities=$q->result_array();

		$output= $cities;

		return $output;

	}
	public function verify_team($id)
	{
				$this->db->where('leader_id', $id);
				$q = $this->db->get('teams');

				if ($q -> num_rows() != 0) {
					return($json_reply=$q->result_array());

				}
				else{

					return($json_reply["error"]=true);
				}
	}

	
}