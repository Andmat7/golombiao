
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

		class homeworks extends MY_Controller {
			function __construct()
			{	
				error_reporting(E_ALL);
				ini_set('display_errors', 'On');	
				parent::__construct();
				$this->load->model('homework','',TRUE);
				$this->load->helper(array('form', 'url'));

				$this->load->library('form_validation');
				$this->form_validation->set_error_delimiters('','');
			}


			public function make_homework()
			{
				$id_homework= $this->input->post('id_homework');
				$done=$this->input->post('done');
				$output=$this->homework->make_homework($id_homework,$done,$this->_USER['id']);
				$imprimir=json_encode($output);
				echo $imprimir;
			}
			public function delete_make_homework()
			{
				$id_homework= $this->input->post('id_homework');
				$output=$this->homework->delete_make_homework($id_homework,$this->_USER['id']);
				$imprimir=json_encode($output);
				echo $imprimir;
			}

			public function create()
			{
				$id= $this->input->post('id_subject');
				$date_deadline= $this->input->post('date_deadline');
				$time_deadline= $this->input->post('time_deadline');
				$desc= $this->input->post('description');
				$ref= $this->input->post('reference');
				$url= $this->input->post('url');
				$this->form_validation->set_rules('id_subject', 'id_subject', 'required');
				$this->form_validation->set_rules('date_deadline', 'date_deadline', 'required');
				// $this->form_validation->set_rules('time_deadline', 'time_deadline', 'required');
				$this->form_validation->set_rules('description', 'description', 'required');

				$fe =strtotime($date_deadline);

				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->homework->create($id,$fe,$desc,$ref,$url,$this->_USER['id']);
					
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


			public function read()
			{
				$id= $this->input->post('id_subject');
				$this->form_validation->set_rules('id_subject', 'id_subject', 'required');
				if ($this->form_validation->run() == TRUE) {
					$output=$this->homework->read($id,$this->_USER['id']);
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
				$id_homework= $this->input->post('id');
				$this->form_validation->set_rules('id','id', 'required');


				if ($this->form_validation->run() == TRUE) {
					$output=$this->homework->read_single($id_homework);
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
				$id_homework= $this->input->post('id');
				$date_deadline= $this->input->post('date_deadline');
				$desc= $this->input->post('description');
				$ref= $this->input->post('reference');
				$url= $this->input->post('url');
				$this->form_validation->set_rules('id', 'id', 'required');
				$fe =strtotime($date_deadline);

				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->homework->update($id_homework,$fe,$desc,$ref,$url,$this->_USER['id']);
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

			public function delete()
			{
				$id_homework= $this->input->post('id');
				$this->form_validation->set_rules('id', 'id', 'required');


				if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
					$output=$this->homework->delete($id_homework,$this->_USER['id']);

					
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