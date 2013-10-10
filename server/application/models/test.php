<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class test extends CI_Model {

			public function read($id)

			{	$time=strtotime(date("Y-m-d H:i:s"));
				$this->db->where('id_subject', $id);
				$this->db->where('deadline >',$time);	
				$this->db->order_by('deadline', 'asc');
				$q = $this->db->get('test');
				if ($q -> num_rows() > 0 ) {
					$test=$q->result_array();
					$this->db->where('id', $id);
					$q = $this->db->get('subjects');
					$subject=$q->result_array();
					$subject=$subject[0]['name'];
					
					foreach ($test as $key => $value) {
											
						$day = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
						$month = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 						$date=$day[date('w',$test[$key]['deadline'])]." ".date('d',$test[$key]['deadline'])." de ".$month[date('n',$test[$key]['deadline'])-1]." ".date("h:ia",$test[$key]['deadline']);;

						$test[$key]=array(
							'id_test'=>$test[$key]['id'],
							'subject'=>$subject,
							'date'=>$date,
							'deadline'=>$test[$key]['deadline'],
							'days_left'=>$test[$key]['deadline'],
							'description'=>$test[$key]['description']	
							);
					}$output= $test;
				}else {$output= array('success'=>'false','message_error'=>'Actualmente no existen exámenes','id_error'=>'1');}
				return $output;
			}

			public function create($id,$fe,$desc,$id_teach)

			{	$teacher=null;
				$this->db->where('id', $id);
				$q = $this->db->get('subjects');
				if ($q -> num_rows() == 1) {

					
					$subjects=$q->result_array();
					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}
				$this->db->where('id', $id);
				$q = $this->db->get('subjects');

				if ($q -> num_rows() == 1 && $id_teach==$teacher ) {

					$data = array(
						'id_subject'=>$id,
						'deadline'=>$fe,
						'description'=>$desc
						);
					$this->db->insert('test',$data);

					$id=$this->db->insert_id();
					
					$output= array('success'=>'true','id_test'=>$id);

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Materia Inexistente','id_error'=>'1');
				}
				return $output;
			}



			public function read_single($id_test)

			{	
				$this->db->where('id', $id_test);
				$this->db->where('deadline >= CURDATE()');	
				$this->db->order_by('deadline', 'asc');
				$q = $this->db->get('test');
				$test=$q->result_array();
				$test=$test[0];

				
				if ($q -> num_rows() > 0 ) {
					$test['date_deadline']=date("Y-m-d",$test['deadline']);
					$test['time_deadline']=date("H:i",$test['deadline']);
					$output= $test;
				}else {$output= array('success'=>'false','message_error'=>'Evaluación inexistente','id_error'=>'1');}
				return $output;
			}




			public function update($id,$fe,$desc,$id_teach)

			{
				$teacher=null;

				

				$this->db->where('id', $id);
				$q = $this->db->get('test');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('test', 'subjects.id= test.id_subject');
					$this->db->where('test.id', $id);
					
					$q = $this->db->get();
					$subjects=$q->result_array();

					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id);
				$q = $this->db->get('test');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$data = array(
						'deadline'=>$fe,
						'description'=>$desc
						);

					foreach ($data as $key => $value) {
						if ($value=='' or $value==null) {
							unset($data[$key]);
						}
					}

					if (!empty($data)) {
						$this->db->where('id', $id);	
						$this->db->update('test', $data);

					}
					$output= array('success'=>'true','message_success'=>'Edición  exitosa');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Evaluación Inexistente','id_error'=>'1');
				}
				return $output;
			}


			public function delete($id,$id_teach)

			{
				$teacher=null;

				

				$this->db->where('id', $id);
				$q = $this->db->get('test');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('test', 'subjects.id= test.id_subject');
					$this->db->where('test.id', $id);
					
					$q = $this->db->get();
					$subjects=$q->result_array();
					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id);
				$q = $this->db->get('test');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$this->db->delete('test', array('id' => $id)); 
					$output= array('success'=>'true','message_success'=>'La evaluación ha sido borrada');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Evaluación Inexistente','id_error'=>'1');
				}
				return $output;
			}


		}