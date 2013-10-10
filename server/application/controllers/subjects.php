<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class subjects extends MY_Controller {
			function __construct()
			{
				error_reporting(E_ALL);
				ini_set('display_errors', 'On');	
				parent::__construct();
				$this->load->model('subject','',TRUE);
				$this->load->helper(array('form', 'url'));

				$this->load->library('form_validation');
				$this->form_validation->set_error_delimiters('','');
			}



			public function create()

			{ 


				$name= $this->input->post('name');				
				$university= $this->input->post('university');
				$faculty= $this->input->post('faculty');
				$country= $this->input->post('country');
				$city= $this->input->post('city');
				$description= $this->input->post('description');
				$start_date= $this->input->post('start_date');
				$end_date= $this->input->post('end_date');

				$rol_user=$this->_USER['rol'];
				$id_user=$this->_USER['id'];

				$this->form_validation->set_rules('name', 'name', 'required');
				$this->form_validation->set_rules('university', 'university', 'required');
				$this->form_validation->set_rules('faculty','faculty', 'required');
				$this->form_validation->set_rules('country', 'country', 'required');
				$this->form_validation->set_rules('city', 'city', 'required');
				$this->form_validation->set_rules('description', 'description', 'required');
				
				

				if ($rol_user==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->subject->create($name,$university,$faculty,$country,$city,$description,$start_date,$end_date,$id_user);
					
				}
				else{

					if ($rol_user==2||3) {
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
				echo json_encode($output);
			}

				public function read()
			
			{
				$id= $this->input->post('id_subject');
				$this->form_validation->set_rules('id_subject', 'id_subject', 'required');


				if ($this->form_validation->run() == TRUE) {
					$output=$this->subject->read($id);
				}
				else{
						$output= array(
							'success' => 'false',
							'message_error'=>validation_errors()
							);
					}

				$imprimir=json_encode($output);
				echo $imprimir;
			}

				public function update()
			
			{
				
				$id= $this->input->post('id_subject');
				$name= $this->input->post('name');				
				$university= $this->input->post('university');
				$faculty= $this->input->post('faculty');
				$country= $this->input->post('country');
				$city= $this->input->post('city');
				$description= $this->input->post('description');
				$start_date= $this->input->post('start_date');
				$end_date= $this->input->post('end_date');

				$rol_user=$this->_USER['rol'];
				$id_user=$this->_USER['id'];

				$this->form_validation->set_rules('id_subject', 'id_subject', 'required');		

				if ($rol_user==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->subject->update($id,$name,$university,$faculty,$country,$city,$description,$start_date,$end_date,$id_user);

					
				}
				else{

					if ($rol_user==2||3) {
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










			