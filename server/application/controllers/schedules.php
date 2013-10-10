<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class schedules extends MY_Controller {
	function __construct()
	{
		error_reporting(E_ALL);
		ini_set('display_errors', 'On');	
		parent::__construct();
		$this->load->model('schedule','',TRUE);
		$this->load->helper(array('form', 'url'));

		$this->load->library('form_validation');
		$this->form_validation->set_error_delimiters('','');
	}



	public function create()

	{ 
		$weekday= $this->input->post('weekday');
		$id_subject= $this->input->post('id_subject');
		$place= $this->input->post('place');
		$room= $this->input->post('room');
		$start_time= $this->input->post('start_time');
		$end_time= $this->input->post('end_time');

		$rol_user=$this->_USER['rol'];
		$id_user=$this->_USER['id'];

		$this->form_validation->set_rules('id_subject', 'id_subject', 'required');
		$this->form_validation->set_rules('place', 'place', 'required');
		$this->form_validation->set_rules('room','room', 'required');
		$this->form_validation->set_rules('start_time', 'start_time', 'required');
		$this->form_validation->set_rules('end_time', 'end_time', 'required');
		$done=0;



		if ($rol_user==2||3 && $this->form_validation->run() == TRUE) {

			foreach ($weekday as $key => $value) {
				if ($weekday[$key]==1) {
					$done=1;

					$output=$this->schedule->create($id_subject,$place,$room,$key,$start_time,$end_time,$id_user);
				}
				if ($done!=1) {
					$output= array(
						'success' => 'false',
						'message_error'=>'Se requiere especificar por lo menos un día.');

				}


			}


		}
		else{

			if ($rol_user==1||3) {
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
		$id_subject= $this->input->post('id_subject');


		$this->form_validation->set_rules('id_subject', 'id_subject', 'required');


		if ($this->form_validation->run() == TRUE) {
			$output=$this->schedule->read($id_subject);
		}
		else{
			$output= array(
				'success' => 'false',
				'message_error'=>validation_errors()
				);
		}
		echo json_encode($output);


	}

	public function read_single()
	{
		$id_schedule= $this->input->post('id');
		$this->form_validation->set_rules('id', 'id', 'required');


		if ($this->form_validation->run() == TRUE) {
			$output=$this->schedule->read_single($id_schedule);
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
		$weekday= $this->input->post('weekday');
		$id_sched= $this->input->post('id');
		$id_subject= $this->input->post('id_subject');
		$place= $this->input->post('place');
		$room= $this->input->post('room');
		$start_time= $this->input->post('start_time');
		$end_time= $this->input->post('end_time');

		foreach ($weekday as $key => $value) {
			if ($weekday[$key]==1) {
				$day=$key;

			}

		}


		$rol_user=$this->_USER['rol'];
		$id_user=$this->_USER['id'];


		$this->form_validation->set_rules('id', 'id', 'required');
		$done=0;
		$create_one=0;




		if ($rol_user==2||3 && $this->form_validation->run() == TRUE) {



			foreach ($weekday as $key => $value) {
				if ($weekday[$key]==1 && $create_one==0) {
					$done=1;
					$create_one=1;
					$output=$this->schedule->update($id_sched,$place,$room,$key,$start_time,$end_time,$id_user);
					
				}
				else if ($weekday[$key]==1)
				{

					$output=$this->schedule->create($id_subject,$place,$room,$key,$start_time,$end_time,$id_user);

				}

				if ($done!=1) {
					$output= array(
						'success' => 'false',
						'message_error'=>'Se requiere especificar por lo menos un día.');

				}


			}
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




	public function delete()
	{
		$id= $this->input->post('id');
		$this->form_validation->set_rules('id','id', 'required');


		if ($this->_USER['rol']==2||3 && $this->form_validation->run() == TRUE) {
			$output=$this->schedule->delete($id,$this->_USER['id']);


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