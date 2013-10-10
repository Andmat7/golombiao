		<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class schedule extends CI_Model {

			
			private $diassem=array(1=>'lunes',2=>'martes',3=>'miercoles',4=>'jueves',5=>'viernes',6=>'sabado',7=>'domingo');
			public function create($id_subject,$place,$room,$day,$start_time,$end_time,$id_user)
			{


					$this->db->where('id', $id_subject);
					$q = $this->db->get('subjects');
					$subjects=$q->result_array();

					

					if ($q -> num_rows() ==1 && $subjects[0]['id_user']==$id_user)
					{

						$data = array(
					'id_subject'=>$id_subject,
					'place'=>$place,
					'room'=>$room,
					'day'=>$day,
					'start_time'=>$start_time,
					'end_time'=>$end_time,
					);
					$this->db->insert('schedules',$data);
					$id = $this->db->insert_id();

					$output= array(
						'success' => 'true',
						'id_schedule'=>$id
						);
					}
					else if ($q -> num_rows() !=1 ) {
						$output= array(
							'success' => 'false',
							'message_error'=>'Materia inexistente'
							);
					}
					else{

						$output= array(
							'success' => 'false',
							'message_error'=>'Usuario sin permisos'
							);
					}
				
				return $output;
			}


				public function read($id_subject)
			{ 
				
					$this->db->where('id_subject', $id_subject);
					$this->db->order_by('day', 'asc');
					$q = $this->db->get('schedules');
					$schedules=$q->result_array();


					if ($q -> num_rows() !=0 ) {

						foreach ($schedules as $key => $schedule) {
							$schedules[$key]['day']=$this->diassem[$schedules[$key]['day']];
							$schedules[$key]['start_time']=date('g:ia',strtotime($schedules[$key]['start_time']));
							$schedules[$key]['end_time']=date('g:ia',strtotime($schedules[$key]['end_time']));
							
										}
						$output=$schedules;
					}else{

						$output= array(
							'success' => 'false',
							'message_error'=>'Actualmente no hay horarios inscritos',
							'id_error'=>'1'
							);

					}

					return $output;

			}


			public function read_single($id_sched)

			{	
				$this->db->where('id', $id_sched);
				$q = $this->db->get('schedules');
				
				if ($q -> num_rows() > 0 ) {
					$schedules=$q->result_array();
					$output= $schedules[0];
				}else {$output= array('success'=>'false','message_error'=>'Horario Inexistente','id_error'=>'1');}
				return $output;
			}




				public function update($id_sched,$place,$room,$day,$start_time,$end_time,$id_teach)
			
				
					
			{
				$teacher=null;

				

				$this->db->where('id', $id_sched);
				$q = $this->db->get('schedules');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('schedules', 'subjects.id= schedules.id_subject');
					$this->db->where('schedules.id', $id_sched);
					
					$q = $this->db->get();
					$subjects=$q->result_array();

					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id_sched);
				$q = $this->db->get('schedules');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$data = array(
						'place'=>$place,
						'room'=>$room,
						'day'=>$day,
						'start_time'=>$start_time,
						'end_time'=>$end_time
						);

					foreach ($data as $key => $value) {
						if ($value=='' or $value==null) {
							unset($data[$key]);
						}
					}

					if (!empty($data)) {
						$this->db->where('id', $id_sched);	
						$this->db->update('schedules', $data);

					}
					$output= array('success'=>'true','message_success'=>'Edicion exitosa');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Horario Inexistente','id_error'=>'1');
				}
				return $output;
			}


			public function delete($id,$id_teach)

			{
				$teacher=null;

				

				$this->db->where('id', $id);
				$q = $this->db->get('schedules');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('schedules', 'subjects.id= schedules.id_subject');
					$this->db->where('schedules.id', $id);
					
					$q = $this->db->get();
					$subjects=$q->result_array();
					$teacher=$subjects[0]['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id);
				$q = $this->db->get('schedules');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$this->db->delete('schedules', array('id' => $id)); 
					$output= array('success'=>'true','message_success'=>'El horario ha sido borrado');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Horario Inexistente ','id_error'=>'1');
				}
				return $output;
			}





}


