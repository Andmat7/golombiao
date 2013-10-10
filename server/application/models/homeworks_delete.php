<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class homeworks extends CI_Model {




			public function read($id)

			{	
				$this->db->where('id_subject', $id);
				$this->db->where('deadline >= CURDATE()');	
				$this->db->order_by('deadline', 'asc');
				$q = $this->db->get('homeworks');
				if ($q -> num_rows() > 0 ) {
					$homeworks=$q->result_array();
					$this->db->where('id', $id);
					$q = $this->db->get('subjects');
					$subject=$q->result_array();
					$subject=$subject[0]['name'];


					
					foreach ($homeworks as $key => $value) {
						$nexttime=strtotime($homeworks[$key]['deadline']);
						$todaytime=strtotime(date("Y-m-d H:i:s"));

						$homeworks[$key]=array(
							'id_homework'=>$homeworks[$key]['id'],
							'Asignatura'=>$subject,
							'fecha de entrega'=>$homeworks[$key]['deadline'],
							'timestamp_entrega'=>$nexttime-$todaytime,
							'description'=>$homeworks[$key]['description']	
							);
					}$output= $homeworks;
				}else {$output= array('success'=>'false','message_error'=>'subject dont exists');}
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
					$this->db->insert('homeworks',$data);

					$id=$this->db->insert_id();
					
					$output= array('success'=>'true','id_homework'=>$id);

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'user without permission');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'subject dont exists');
				}
				return $output;
			}





			public function update($id,$fe,$desc,$id_teach)

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
						'description'=>$desc
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
					$output= array('success'=>'true');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'user without permission');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'homeowrk dont exists');
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
					$output= array('success'=>'true');

				}else if($id_teach!=$teacher && $r1)
				{
					$output= array('success' => 'false','message_error'=>'user without permission');
				}
				else
				{
					$output= array('success'=>'false','message_error'=>'homework already delete ');
				}
				return $output;
			}


		}