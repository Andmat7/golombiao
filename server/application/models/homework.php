<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class homework extends CI_Model {
			
			public function make_homework($id_homework,$done,$id_user)
			{

				$data = array(
						'id_user'=>$id_user,
						'id_homework'=>$id_homework,
						'done'=>$done
						);
					$this->db->insert('student_homeworks',$data);

					$id=$this->db->insert_id();
					
					$output= array('success'=>'true');
				return $output;
			}

			public function delete_make_homework($id_homework,$id_user)
			{

				$this->db->delete('student_homeworks', array('id_user' => $id_user,'id_homework' => $id_homework));
				$output= array('success'=>'true');
				return $output;
			}

			public function read($id,$id_user){
				$time=strtotime(date("Y-m-d H:i:s"));
				$this->db->where('id_subject', $id);
				$this->db->where('deadline >',$time);	
				$this->db->order_by('deadline', 'asc');
				$q = $this->db->get('homeworks');
				 $day = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
				 $month = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
				if ($q -> num_rows() > 0 ) {
					$homeworks=$q->result_array();
					
					foreach ($homeworks as $key => $value) {
						$this->db->where('id_homework',$homeworks[$key]['id']);
						$this->db->where('id_user',$id_user);
						$q = $this->db->get('student_homeworks');
	
						$done=' ';
						if ($q -> num_rows() ==1 ){ $done=1;}
					
						$date_deadline=$day[date('w',$homeworks[$key]['deadline'])]." ".date('d',$homeworks[$key]['deadline'])." de ".$month[date('n',$homeworks[$key]['deadline'])-1]." ".date("g:ia",$homeworks[$key]['deadline']);
						
						$homeworks[$key]=array(
							'id_homework'=>$homeworks[$key]['id'],
							'day_left'=>$homeworks[$key]['deadline'],
							'reference'=>$homeworks[$key]['reference'],
							'url'=>$homeworks[$key]['url'],
							'done'=>$done,
							'description'=>$homeworks[$key]['description']	
							);
					}$output= $homeworks;
				}else {$output= array('success'=>'false','message_error'=>'Actualmente no existen tareas','id_error'=>'1');}
				return $output;
			}

			public function create($id,$fe,$desc,$ref,$url,$id_teach){
				$teacher=null;
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
						'description'=>$desc,
						'reference'=>$ref,
						'url'=>$url
						);
					$this->db->insert('homeworks',$data);

					$id=$this->db->insert_id();
					
					$output= array('success'=>'true','id_homework'=>$id);

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'La materia no existe','id_error'=>'1');
				}
				return $output;
			}




			public function read_single($id_homework)

			{	
				$this->db->where('id', $id_homework);
				$this->db->where('deadline >= CURDATE()');	
				$this->db->order_by('deadline', 'asc');
				$q = $this->db->get('homeworks');
				$homework=$q->result_array();
				$homework=$homework[0];
				
				
				if ($q -> num_rows() > 0 ) {
					
					$homework['date_deadline']=date("Y-m-d",$homework['deadline']);
					$homework['time_deadline']=date("H:i",$homework['deadline']);
					$output= $homework;
				}else {$output= array('success'=>'false','message_error'=>'La tarea no existe','id_error'=>'1');}
				return $output;
			}





			public function update($id,$fe,$desc,$ref,$url,$id_teach)

			{
				$teacher=null;

				

				$this->db->where('id', $id);
				$q = $this->db->get('homeworks');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('homeworks', 'subjects.id= homeworks.id_subject');
					$this->db->where('homeworks.id', $id);
					
					$q = $this->db->get();
					$subjects=$q->result_array();

					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id);
				$q = $this->db->get('homeworks');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$data = array(
						'deadline'=>$fe,
						'description'=>$desc,
						'reference'=>$ref,
						'url'=>$url,
						);

					foreach ($data as $key => $value) {
						if ($value=='' or $value==null) {
							unset($data[$key]);
						}
					}

					if (!empty($data)) {
						$this->db->where('id', $id);	
						$this->db->update('homeworks', $data);

					}
					$output= array('success'=>'true','message_success'=>'Edición exitosa');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permisos');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'La tarea no Existe','id_error'=>'1');
				}
				return $output;
			}


			public function delete($id,$id_teach)

			{
				$teacher=null;

				

				$this->db->where('id', $id);
				$q = $this->db->get('homeworks');
				if ($q -> num_rows() == 1) {

					$this->db->select('subjects.*');
					$this->db->from('subjects');
					$this->db->join('homeworks', 'subjects.id= homeworks.id_subject');
					$this->db->where('homeworks.id', $id);
					
					$q = $this->db->get();
					$subjects=$q->result_array();
					$subject=$subjects[0];
					$teacher=$subject['id_user'];
					$r1=1;

				}else {$r1=0;}

				$this->db->where('id', $id);
				$q = $this->db->get('homeworks');


				if ($q -> num_rows() == 1  && $id_teach==$teacher) {

					$this->db->delete('homeworks', array('id' => $id)); 
					$output= array('success'=>'true','message_success'=>'Ha borrado la tarea exitosamente');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'Usuario sin permiso');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Tarea inexistente','id_error'=>'1');
				}
				return $output;
		}
		}