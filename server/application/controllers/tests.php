
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class tests extends MY_Controller {
			function __construct()
			{
				error_reporting(E_ALL);
				ini_set('display_errors', 'On');	
				parent::__construct();
				$this->load->model('test','',TRUE);
				$this->load->helper(array('form', 'url'));

				$this->load->library('form_validation');
				$this->form_validation->set_error_delimiters('','');
			}

			public function create()
			{
				$id= $this->input->post('id_subject');
				$date_deadline= $this->input->post('date_deadline');
				$time_deadline= $this->input->post('time_deadline');
				$desc= $this->input->post('description');

				$this->form_validation->set_rules('id_subject','id_subject', 'required');
				$this->form_validation->set_rules('date_deadline', 'date_deadline', 'required');
				//$this->form_validation->set_rules('time_deadline', 'time_deadline', 'required');
				$this->form_validation->set_rules('description', 'description', 'required');

				$fe =strtotime($date_deadline);

				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->test->create($id,$fe,$desc,$this->_USER['id']);					
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
							'message_error'=>'El usuario no es un profesor');
					}

				}
				$imprimir=json_encode($output);
				echo $imprimir;
				
			}


			public function read()
			{
				$id= $this->input->post('id_subject');
				$this->form_validation->set_rules('id_subject', 'id_subject', 'required');
				if ($this->form_validation->run() == TRUE) {
					$output=$this->test->read($id);
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

			public function read_single()
			{
				$id_test= $this->input->post('id');
				$this->form_validation->set_rules('id', 'id', 'required');


				if ($this->form_validation->run() == TRUE) {
					$output=$this->test->read_single($id_test);
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
				$id= $this->input->post('id');
				$date_deadline= $this->input->post('date_deadline');
				// $time_deadline= $this->input->post('time_deadline');
				$desc= $this->input->post('description');
				$this->form_validation->set_rules('id','id', 'required');
				$fe =strtotime($date_deadline);


				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->test->update($id,$fe,$desc,$this->_USER['id']);

					
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
							'message_error'=>'El usuario no es un profesor');
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
					$output=$this->test->delete($id,$this->_USER['id']);

					
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
							'message_error'=>'El usuario no es un profesor');
					}

				}


				
				$imprimir=json_encode($output);
				echo $imprimir;
				

			}





}