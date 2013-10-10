<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class notification extends CI_Model {
			public function read($id_subject=101){
				$time=strtotime(date("Y-m-d H:i:s"));
				$this->db->where('subject_id', $id_subject);
				$this->db->where('expires_timestamp >',$time);	
				$this->db->order_by('expires_timestamp', 'asc');
				$q = $this->db->get('notifications');
				$q = $q->result_array();
				return $q;
			}

			public function create($description, $expires_timestamp, $subject_id, $canceled_day){
				$this->db->where('id', $subject_id);
				$q = $this->db->get('subjects');
				if ($q -> num_rows() == 1) {
					$data = array(
							'subject_id'=>$subject_id,
							'expires_timestamp'=>$expires_timestamp,
							'description'=>$description,
							'canceled_day'=>$canceled_day
							);
					$notification_id = $this->db->insert('notifications',$data);
					$output= array('success'=>'true','notification_id'=>$notification_id);
				} else{
					$output= array('success'=>'false','message_error'=>'La materia no existe');
				}
				return $output;
			}

		}

		
?>
