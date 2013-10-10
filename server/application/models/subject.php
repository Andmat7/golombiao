	<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class subject extends CI_Model {

			private $diassem=array(1=>'lunes',2=>'martes',3=>'miercoles',4=>'jueves',5=>'viernes',6=>'sabado',7=>'domingo');

			public function create($name,$university,$faculty,$country,$city,$description,$start_date,$end_date,$id_user)
			{
				$data = array(
					'name'=>$name,
					'university'=>$university,
					'faculty'=>$faculty,
					'country'=>$country,
					'city'=>$city,
					'description'=>$description,
					'start_date'=>$start_date,
					'end_date'=>$end_date,
					'id_user'=>$id_user				
					);
				$this->db->insert('subjects',$data);
				$id = $this->db->insert_id();

				$output= array(
					'success' => 'true',
					'id_subject'=>$id
					);
				return $output;
			}



			public function read($id)
			{



				$this->db->select('subjects.*,users.name as name_user');

				$this->db->from('subjects');

				$this->db->join('users', 'users.id = subjects.id_user');

				
								
				
				$this->db->where('subjects.id', $id);
				$q=$this->db->get();

				if ($q -> num_rows() == 1 ) {
				
				$subjects=$q->result_array();



				$subject=$subjects[0];
				$this->db->where('id_subject', $id);
				$l = $this->db->get('schedules');
				$schedules=$l->result_array();
				
				foreach ($schedules as $key => $schedule) {

					unset($schedules[$key]['id_subject']);
					unset($schedules[$key]['id']);
					$schedules[$key]['day']=$this->diassem[$schedules[$key]['day']];
				}
			
				$output=array(
					'id'=>$id,
					'id_subject'=>$id,
					'name'=>$subject['name'],
					'name_user'=>$subject['name_user'],
					'university'=>$subject['university'],
					'faculty'=>$subject['faculty'],
					'description'=>$subject['description'],
					'country'=>$subject['country'],
					'city'=>$subject['city'],
					'start_date'=>$subject['start_date'],
					'end_date'=>$subject['end_date'],
					'schedules'=>$schedules,
					);
				
				}else{
					$output= array('success' => 'false','message_error'=>'Materia Inexistente','id_error'=>'1');
				}
				return $output;


			}



			public function update($id,$name,$university,$faculty,$country,$city,$description,$start_date,$end_date,$id_user){

				$this->db->where('id', $id);
				$q = $this->db->get('subjects');
				$subjects=$q->result_array();
				$subject=$subjects[0];


				if ($q -> num_rows() ==1 && $id_user==$subject['id_user']) {

					$data = array(
					'name'=>$name,
					'university'=>$university,
					'faculty'=>$faculty,
					'country'=>$country,
					'city'=>$city,
					'description'=>$description,
					'start_date'=>$start_date,
					'end_date'=>$end_date,	
					);
					

					foreach ($data as $key => $value) {
						if ($value=='' or $value==null) {
							unset($data[$key]);
						}

					}

					if (!empty($data)) {
						$this->db->where('id', $id);
						$this->db->update('subjects', $data); 
					}

					$output= array('success' => 'true','message_success'=>'Edición exitosa');

				}
				else if($id_user!=$subject['id_user']){
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');

				}else {$output= array('success' => 'false','message_error'=>'Materia Inexistente','id_error'=>'1');}
				return  $output;
			}



			public function delete($id,$id_user)
			{

				$q=$this->db->where('id', $id);
				$q = $this->db->get('subjects');
				$subjects=$q->result_array();
				

				if ($q -> num_rows() ==1 && $id_user==$subjects[0]['id_user']) {
					$this->db->delete('subjects', array('id' => $id)); 
					$this->db->delete('schedules', array('id_subject' => $id)); 
					$output= array('success'=>'true','message_success'=>'La materia ha sido borrada');



				}else if  ( $q -> num_rows()==0  )
				{
					$output= array('success'=>'false','message_error'=>'Materia Inexistente','id_error'=>'1');
				}

				else if($id_user!=$subjects[0]['id_user'])
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				
				return $output;
			}














		}