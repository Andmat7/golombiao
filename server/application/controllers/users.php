<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends MY_Controller {

	public function new_user()
	{
		

		$first_name= $this->input->post('first_name');
		$last_name= $this->input->post('last_name');
		$age= $this->input->post('age');
		$gender= $this->input->post('gender');
		$email= $this->input->post('email');
		$city= $this->input->post('city');
		$study= $this->input->post('study');
		$school_level= $this->input->post('school_level');
		$encrypted_password= $this->input->post('encrypted_password');
		$output=$this->user->new_user($first_name,$last_name,$age,$gender,$email,$city,$study,$school_level,$encrypted_password);
	
		echo $output;
		
	}


	public function idstudent($id)
	{
			//$id= $this->input->post('id');
		$output=$this->subject->find_subjects_student($id);
		$imprimir=json_encode($output);
		echo $imprimir;
		
	}
	public function partners()
	{
		$subject_id= $this->input->post('subject_id');
		$output=$this->user->find_partners($subject_id);
		echo json_encode($output);
		
	}	

	public function subscribe()
	{
		$id_subject= $this->input->post('id_subject');
		$output=$this->user->subscribe($id_subject,$this->_USER['id']);
		echo json_encode($output);
	}
	public function unsubscribe()
	{
		$id_subject= $this->input->post('id');

		$output=$this->user->unsubscribe($id_subject,$this->_USER['id']);
		echo json_encode($output);
	}

	public function subjects_student()
	{
		$id_student= $this->input->post('id_student');
		$output=$this->user->get_subjects_student($id_student);
		echo json_encode($output);
		
	}

	public function subjects_teacher()
	{
		$id_teacher= $this->input->post('id_teacher');
		$output=$this->user->get_subjects_teacher($id_teacher);
		echo json_encode($output);
		
	}
	public function read_edit()
	{
		$output=$this->user->read_edit($this->_USER['id']);
		echo json_encode($output);

	}
	public function update()
	{

		$username= $this->input->post('username');
		$encrypted_password= $this->input->post('encrypted_password');		
		$confirmed_password= $this->input->post('confirmed_password');
		$name= $this->input->post('name');
		$phone= $this->input->post('phone');
		$institution= $this->input->post('institution');

		$output=$this->user->update($username,$encrypted_password,$confirmed_password,$name,$phone,$institution,$this->_USER['id']);
		echo json_encode($output);



	}


}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */