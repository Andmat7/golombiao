<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class team extends CI_Model {





	public function new_team($name,$departamento,$ciudad,$zone_team,$descripcion,$user_id){
		$this->db->where('leader_id', $user_id);
		$q = $this->db->get('teams');
		if ($q -> num_rows() < 3) {
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
		else {return false;}


	}



	public function add_user($id_user,$id_team)
	{
		$this->db->where('id_user', $id_user);
		$q = $this->db->get('users_teams');
		if ($q -> num_rows() == 5)
		{
			$json_reply["error"]=true;
			$json_reply["error_code"]=1;
			$json_reply["message_error"]="Numero maximo de equipos inscritos";
			return ($json_reply);
		}


		$this->db->where('id_user', $id_user);
		$this->db->where('id_team', $id_team);
		$q = $this->db->get('users_teams');
		if ($q -> num_rows() < 1) {

		$data = array(
			'id_user'=>$id_user,
			'id_team'=>$id_team,			
			);
		$this->db->insert('users_teams',$data);

				$json_reply["error"]=false;
				
		}
		else{
			$json_reply["error"]=true;
			$json_reply["error_code"]=2;
			$json_reply["message_error"]="ud ya se encuentra suscrito al equipo: ";
			}
			return ($json_reply); 
	}

	public function select_from_city($id_city,$id_user)
	{
		$this->db->where('ciudad', $id_city);
		$this->db->where_not_in('leader_id',$id_user);

		$q = $this->db->get('teams');
		$cities=$q->result_array();
		if(sizeof($cities) == 0 ) {
			$json_reply["error"]=true;
			$json_reply["message_error"]="No hay equipos en esta ciudad";
			
		} else {

				$json_reply=$cities;

			
		}
		return $json_reply;

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

	public function verify_convocatory($id, $tipo_consulta) {
		if ($tipo_consulta == 0) {
			$query = $this->db
			->select('convocatoria.id, 
				(select name from teams where id = equipo_1) equipo_1_name, 
				(select name from teams where id = equipo_2) equipo_2_name, 
				equipo_1,
				equipo_2,
				fecha, 
				hora,
				principio,
				acepta_convocatoria')
			->from('teams')
			->where('leader_id',$id)
			->join('convocatoria','equipo_1 = teams.id')
			->get();

		} else {
			$query = $this->db
			->select('convocatoria.id, 
				(select name from teams where id = equipo_1) equipo_1_name, 
				(select name from teams where id = equipo_2) equipo_2_name,
				equipo_1,
				equipo_2, 
				fecha, 
				hora,
				principio,
				acepta_convocatoria')
			->from('teams')
			->where('leader_id',$id)
			->join('convocatoria','equipo_2 = teams.id')
			->get();
		}

		$result_list = $query->result_array();
		if(sizeof($result_list) != 0 ){
			return($result_list);
		} else {
			return($json_reply["error"]=true);
		}
	}


	public function guardar_convocatoria($datos) {
		date_default_timezone_set("America/Bogota");
		$today=strtotime(date("Y-m-d H:i:s"));
		$hour=strtotime(date("Y-m-d H:i:s")."+1 hour");
		$convocateDate=strtotime($datos['fecha']." ".$datos['hora']);


		if ($convocateDate<$today)
		{
			$json_reply["error"]=true;
			$json_reply["message_error"]="Fecha incorrecta, por favor ingrese una fecha posterior";

			return $json_reply;
		}



		if ($convocateDate<$hour) {
			$json_reply["error"]=true;
			$json_reply["message_error"]="se debe dar un plazo minimo de una hora para aceptar jugar la convocatoria";

			return $json_reply;
		}		

		$query = $this->db
		->select('id')
		->from('convocatoria')
		->where('equipo_1', $datos['equipo_1'])
		->where('equipo_2', $datos['equipo_2'])
		->or_where('equipo_1', $datos['equipo_2'])
		->where('equipo_2', $datos['equipo_1'])
		->get();

		$result_list = $query->result_array();

		if(sizeof($result_list) == 0 ) {
			$this->db->insert('convocatoria', $datos); 
			$json_reply["error"]=false;
			
		} else {
			$json_reply["error"]=true;
			$json_reply["message_error"]="Ya se ha solicitado un encuentro con este equipo";
		}
		return $json_reply;

	}

	public function guardar_resultados($datos) {
		$this->db->insert('resultados', $datos);
		$this->db->where('id_conv', $datos['id_conv']);
		$q = $this->db->get('resultados');
		if ($q -> num_rows() == 2) {

			return true;
		}
		else{
			return false;


		}
	}



	public function existen_resultados($id_user, $id_conv) {
		$query = $this->db
		->select('id')
		->from('resultados')
		->where('id_user', $id_user)
		->where('id_conv', $id_conv)
		->get();

		$result_list = $query->result_array();

		if(sizeof($result_list) == 0 ) {
			return (false);
		} else {
			return (true);
		}
	}

	public function promedio_resultados($id_conv) {
		$query = $this->db
		->select('sum(principio)/count(*) principio')
		->select('sum(barra)/count(*) barra')
		->select('sum(cump_acuerdos)/count(*) cump_acuerdos')
		->select('sum(faltas)/count(*) faltas')
		->select('sum(meritos)/count(*) meritos')
		->from('resultados')
		->where('id_conv', $id_conv)
		->get();

		$result_list = $query->result_array();

		return $result_list;
	}

	public function maps_convocatoria() {
		$this->db->where_not_in('id',null);
		$q = $this->db->get('convocatoria');
		$result_list = $q->result_array();
		date_default_timezone_set("America/Bogota");

		foreach ($result_list as $key => $value) {
			$today=strtotime(date("Y-m-d H:i:s"));
			$convocateDate=strtotime($result_list[$key]['fecha']." ".$result_list[$key]['hora']);

			if ($convocateDate<$today) {
				$result_list[$key]['played']=0;

			}else{
				$result_list[$key]['played']=1;
			}
		}
		return $result_list;
	}

	public function aceptRequest($id_user, $id_conv) {
		$data = array(               
			'acepta_convocatoria'=> 1,
			);

		$this->db->where('id', $id_conv);
		$this->db->update('convocatoria', $data);
		$json_reply["error"]=false;
		return $json_reply;
	}

	public function deleteRequest($id_user, $id_conv) {

		$this->db->delete('convocatoria', array('id' => $id_conv));
		$json_reply["error"]=false;
		return $json_reply;

		}
		public function resultsRequests($id_conv){

			$this->db->where('id_conv', $id_conv);
			$q = $this->db->get('resultados');
				if ($q -> num_rows() < 2) {

					$json_reply["error"]="true";
					return($json_reply);

				}else{
					$result = $q->result_array();

					foreach ($result as $key => $value) {

							$this->db->where('id_team',$result[$key]["id_equipo"]);
						
							$q = $this->db->get('users_teams');

							if ($q -> num_rows() < 5) {
								$result[$key]["n_Subscribers"]=0;
							}else if ($q -> num_rows() < 7 && $q -> num_rows() > 5 ) {
								$result[$key]["n_Subscribers"]=2;
								# code...
							}else if ($q -> num_rows() > 8) {
								$result[$key]["n_Subscribers"]=3;
							}
							
					}
					$result[0]["total"]=0;
					$result[1]["total"]=0;
					$temp=$result[0]["otherTeam"];
					$result[0]["otherTeam"]=$result[1]["otherTeam"];
					$result[1]["otherTeam"]=$temp;
					foreach ($result as $key => $value) {

							foreach ($result[$key] as $key2 => $value) {

							if ($key2=="id"||$key2=="id_conv"||$key2=="id_equipo"||$key2=="id_user"||$key2=="principio"||$key2=="total") {
								
							}else{
								
								$result[$key]["total"]=$result[$key]["total"]+ $result[$key][$key2];
								}
							}
				
					}
				}

				return $result;
		}


		public function savePoints($results) {

			foreach ($results as $key => $value) {
				
				$this->db->where('id_team', $results[$key]['id_equipo']);
				$q = $this->db->get('users_teams');
				$users=$q->result_array();

				foreach ($users as $keyTwo => $value) {
					$this->db->where('id',$users[$keyTwo]['id_user'] );
					$q = $this->db->get('users');
					$user=$q->result_array();
					$user=$user[0];
					$points=$user['points']+$results[$key]['total'];
					$data = array(               
						'points'=> $points,
					);
					$this->db->where('id',$users[$keyTwo]['id_user'] );
					$this->db->update('users', $data);

				}

			}


		}

		public function  getData($id_user){
			$this->db->where('id',$id_user);
			$q = $this->db->get('users');
			$user=$q->result_array();
			$user=$user[0];
			return $user;


		}

		public function getImagesNames(){
			
			$this->db->order_by("id", "desc"); 
			$q = $this->db->get('images');
			$files=$q->result_array();
		

		return($files);





		}



	
}