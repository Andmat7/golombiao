<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class team extends CI_Model {


	public function myTeams($id){

		$this->db->where('id_user', $id);
		$q = $this->db->get('users_teams');

		if ($q -> num_rows() == 0) {

			$json_reply["error"]=true;
			$json_reply["message_error"]="aun no estas suscrito a ningun equipo";



		}else{


		$json_reply=$q->result_array();

		foreach ($json_reply as $key => $value) {
			$json_reply[$key]["name_team"]=0;
			$this->db->where('id', $json_reply[$key]["id_team"]);
			$q = $this->db->get('teams');
			$team=$q->result_array();
				$json_reply[$key]["name_team"]=$team[0]["name"];
		}


			
		}


		return  $json_reply;



	}


	public function deleteTeam($id_team,$id_user){

		
		$this->db->delete('convocatoria', array('equipo_1' => $id_team)); 
		$this->db->delete('convocatoria', array('equipo_2' => $id_team));
		$this->db->delete('users_teams', array('id_team' => $id_team));  
		$this->db->delete('teams', array('id' => $id_team));
			$json_reply["error"]=false;

		return  $json_reply;


	}


		public function get_players($id_team,$id_user){
			$this->db->where('id_team', $id_team);
			$q = $this->db->get('users_teams');
			if ($q -> num_rows() == 3) {

			$json_reply["error"]=true;
			$json_reply["error_code"]=1;
			$json_reply["message_error"]="No existen jugadores para ste equipo";




			}else{
				$json_reply=$q->result_array();
				foreach ($json_reply as $key => $value) {
					$json_reply[$key]["id_user"];

					$json_reply[$key]["name_user"]=0;
					$this->db->where('id', $json_reply[$key]["id_user"]);
					$q = $this->db->get('users');
					$user=$q->result_array();
						$json_reply[$key]['name_user']=$user[0]['first_name']." ".$user[0]['last_name'];
				}

			
			}
			

		return  $json_reply;


	}
	public function validate_players($id_team)
	{
		$this->db->where('id_team', $id_team);
		$q = $this->db->get('users_teams');
		if ($q -> num_rows() >1) {

				$json_reply=$q->result_array();
				$numero_mujeres=0;
				$numero_hombres=0;
				foreach ($json_reply as $key => $value) {
					$this->db->where('id', $json_reply[$key]["id_user"]);
					$q = $this->db->get('users');
					$user=$q->result_array();

					if($user[0]["gender"]=='1'||$user[0]["gender"]=='1'){
						$numero_hombres=$numero_hombres+1;
					}else{
						$numero_mujeres=$numero_mujeres+1;

					}
				}
				if ($numero_hombres<2) {
					$json_reply["error"]=true;
			
					$json_reply["message_error"]="Tu equipo debe tener dos hombres o mas  para que puedas convocar";
					# code...
				}else{
					if ($numero_mujeres<2) {
						$json_reply["error"]=true;
						$json_reply["message_error"]=" Tu equipo debe tener dos mujeres o mas para que puedas convocar";
					}else{
						$json_reply["error"]=false;
						$json_reply["sucess_menssage"]="ok";

					}

				}
			




		}else{
			$json_reply["error"]=true;
            $json_reply["message_error"]=" Tu equipo debe tener más  jugadores para que puedas convocar"; 			
			//$json_reply["message_error"]=" TU equipo debe tener más  jugadores para que puedas convocar".$q -> num_rows();


		}
		return $json_reply;
	}



public function userData($id_user){

		$this->db->where('id', $id_user);
		$q = $this->db->get('users');
		$json_reply=$q->result_array();
		return  $json_reply[0];




}





		public function deleteSubscription($id_team,$id_user){


		$this->db->delete('users_teams', array('id' => $id_team,'id_user' => $id_user)); 
			$json_reply["error"]=false;

		return  $json_reply;


	}



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
			$json_reply["message_error"]="usted ya se encuentra suscrito al equipo: ";
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
			$json_reply["error"]=true;
			return($json_reply);
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

		$this->db->where('id', $id_conv);
		$q = $this->db->get('convocatoria');
		$result_list = $q->result_array();
		$result_list=$result_list[0];
		date_default_timezone_set("America/Bogota");
		$today=strtotime(date("Y-m-d H:i:s"));
		$convocateDate=strtotime($result_list['fecha']." ".$result_list['hora']);


		if ($convocateDate>$today) {
			$json_reply["error"]=false;
			$json_reply["message_error"]="Debes esperar a que pase la fecha de la convocatoria para poder evaluar";
			return ($json_reply);
			}





		$query = $this->db
		->select('id')
		->from('resultados')
		->where('id_user', $id_user)
		->where('id_conv', $id_conv)
		->get();

		$result_list = $query->result_array();

		if(sizeof($result_list) == 0 ) {
			$json_reply["error"]=false;
			$json_reply["message_error"]="Aun no has evaluado, por favor hazlo para ver los resultados";
			return ($json_reply);
		} else {
			$json_reply["error"]=true;
			return ($json_reply);
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
					$json_reply["message_error"]="Debes esperar a que el otro equipo evalue para ver los resultados";
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
							$result[$key]["name_team"]=0;
							$this->db->where('id', $result[$key]["id_equipo"]);
							$q = $this->db->get('teams');
							$team=$q->result_array();
								$result[$key]["name_team"]=$team[0]["name"];




							foreach ($result[$key] as $key2 => $value) {

							if ($key2=="id"||$key2=="name_team"||$key2=="id_conv"||$key2=="id_equipo"||$key2=="id_user"||$key2=="principio"||$key2=="total") {
								
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
		public function get_team($id_team)
		{
			$this->db->where('id',$id_team);
			$q = $this->db->get('teams');
			$user=$q->result_array();
			$user=$user[0];
			return $user;
		}



	
}