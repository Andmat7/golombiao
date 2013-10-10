<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class notifications extends MY_Controller {
			function __construct(){
				error_reporting(E_ALL);
				ini_set('display_errors', 'On');	
				parent::__construct();
				$this->load->model('notification','',TRUE);
				$this->load->helper(array('form', 'url'));
				$this->load->library('form_validation');
				$this->form_validation->set_error_delimiters('','');
			}

			public function create(){
				$subject_id = $this->input->post('subject_id');
				$expires_timestamp = $this->input->post('expires_timestamp');
				$description = $this->input->post('description');
				$canceled_day = $this->input->post('canceled_day');
				
				$this->form_validation->set_rules('subject_id', 'Materia', 'required');
				$this->form_validation->set_rules('expires_timestamp', 'Fecha', 'required');
				$output=$this->notification->create($description, $expires_timestamp, $subject_id, $canceled_day);
				echo json_encode($output);
			}

			public function read(){
				$subject_id = $this->input->post('subject_id');
				//$subject_id = 1; //TODO temporal, borrar
				
				//$this->form_validation->set_rules('id_subject', 'id_subject', 'required');
				$output=$this->notification->read($subject_id); 
				// if ($this->form_validation->run() == TRUE) {
				// 	$output=$this->subject->read($id);
				// }
				// else{
				// 		$output= array(
				// 			'success' => 'false',
				// 			'message_error'=>validation_errors()
				// 			);
				// 	}

				$imprimir=json_encode($output);
				echo $imprimir;
			}

			// public function update(){
				
			// 	$id= $this->input->post('id_subject');
			// 	$name= $this->input->post('name');				
			// 	$university= $this->input->post('university');
			// 	$faculty= $this->input->post('faculty');
			// 	$country= $this->input->post('country');
			// 	$city= $this->input->post('city');
			// 	$description= $this->input->post('description');
			// 	$start_date= $this->input->post('start_date');
			// 	$end_date= $this->input->post('end_date');

			// 	$rol_user=$this->_USER['rol'];
			// 	$id_user=$this->_USER['id'];

			// 	$this->form_validation->set_rules('id_subject', 'id_subject', 'required');		

			// 	if ($rol_user==2||3 && $this->form_validation->run() == TRUE) {
			// 		$output=$this->subject->update($id,$name,$university,$faculty,$country,$city,$description,$start_date,$end_date,$id_user);

					
			// 	}
			// 	else{

			// 		if ($rol_user==2||3) {
			// 			$output= array(
			// 				'success' => 'false',
			// 				'message_error'=>validation_errors()
			// 				);
			// 		}else{
			// 			$output= array(
			// 				'success' => 'false',
			// 				'message_error'=>'The user is not teacher');
			// 		}

			// 	}



			// 	$imprimir=json_encode($output);
			// 	echo $imprimir;

			// }

			public function delete()
			{
				$id= $this->input->post('id');
				$this->form_validation->set_rules('id','id', 'required');


				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->subject->delete($id,$this->_USER['id']);

					
				}
				else{

					if ($this->_USER['rol']==2||3) {
						$output= array(
							'success' => 'false',
							'message_error'=>validation_errors()
							);
					}else{
						$output= array(
							'success' => 'false',
							'message_error'=>'The user is not teacher');
					}

				}


				
				$imprimir=json_encode($output);
				echo $imprimir;
				

			}


			}
