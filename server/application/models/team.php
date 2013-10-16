<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class team extends CI_Model {





	public function new_team($name,$departamento,$city,$zone_team,$descripcion,$user_id){

			$data = array(
				'name'=>$name,
				'departamento'=>$departamento,
				'zone_team'=>$zone_team,
				'city'=>$city,
				'description'=>$descripcion,			
				'user_id'=>$user_id,
				);
			$this->db->insert('teams',$data);
			return true;
	}



}