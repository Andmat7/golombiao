<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends CI_Model {

	public function sel_city($id)
	{	

			$output=true;



		return $output;
	}






	public function login($email,$encrypted_password)
	{	
		$this->db->where('email', $email);
		$this->db->where('encrypted_password', $encrypted_password);
		$q = $this->db->get('users');
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();
			return $user[0];
		}
		else
		{
			return false;
		}
	}
		public function get($id)
	{
		$this->db->get_where('users', array('id' => $id));
				$q = $this->db->get('users');
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();
			return $user[0];
		}
		else
		{
			return false;
		}
	}







	public function find_partners($id)
	{
		$this->db->where('id_subject', $id);

		$q = $this->db->get('student_subject');
		$subjects=$q->result_array();
		
		if ($q -> num_rows() > 1 ) {
			foreach ($subjects as $key => $value) {
				$this->db->where('id',$subjects[$key]['id_student']);
				$q= $this->db->get('users');
				$users=$q->result_array();

				$user[$key]=$users[0];
				$user[$key]['partner-name']=$user[$key]['name'];
				$user[$key]['partner-email']=$user[$key]['email'];
				$user[$key]['partner-phone']=$user[$key]['phone'];	
				
				unset($user[$key]['id']);
				unset($user[$key]['email']);
				unset($user[$key]['name']);
				unset($user[$key]['phone']);
				unset($user[$key]['username']);
				unset($user[$key]['encrypted_password']);
				unset($user[$key]['session_id']);
				unset($user[$key]['rol']);
				unset($user[$key]['timesession']);

			}

		$output=$user;

		}else {
			$output=array ('success'=>'false','message_error'=>'No se encontraron usuarios asociados a esta asignatura','id_error'=>'1');

		}
		return $output;
	}



	public function generar_session_id($user_id)
	{
		$data = array(               
			'session_id'=> $this->generateRandomString(30),
			'timesession'=> date("Y-m-d H:i:s")
			);

		$this->db->where('id', $user_id);
		$this->db->update('users', $data);
		return $data["session_id"];
	}


	public function verify_id($email, $session_id)
	{
		$this->db->where('email', $email);
		$this->db->where('session_id', $session_id);
		$q = $this->db->get('users');
	

		//echo ($this->db->last_query());
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();
			
			$user=$user[0];
			

			$oldtime=strtotime($user['timesession']);
			$todaytime=strtotime(date("Y-m-d H:i:s"));
			
			if ($todaytime-$oldtime>'604800') {
				return false;

			}
			else{
				return $user;


			}
		}
		else
		{
			return false;
		}
	}



	function generateRandomString($length = 10) {
		return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
	}

	public function create($user,$email,$pass)
	{

		$data = array(
			'username'=>$user,
			'encrypted_password'=>$pass,
			'email'=>$email);

		$pb1=$this->db->where('email', $email);
		/*print_r($pb1);
		exit;*/
		$this->db->insert('users',$data);
		$output= array('success' => 'true');
		return $output;
	}


	public function subscribe($id_subject,$id_user)
	{			
				$this->db->where('id', $id_subject);
				$q = $this->db->get('subjects');
				if ($q -> num_rows()==1) {	$subj=1;
				}else{
						$subj=0;
				}



				$this->db->where('id_subject', $id_subject);
				$this->db->where('id_student', $id_user);

				$q = $this->db->get('student_subject');
				
				


				if ($q -> num_rows()==0 && $subj==1) {
					$data = array(
					'id_student'=>$id_user,
					'id_subject'=>$id_subject,
					);

					$this->db->insert('student_subject',$data);
					$output= array('success' => 'true','message_success'=>'Se ha suscrito a la materia:');
				} 
				else if($q -> num_rows()!=0)
				{

					$output= array('success' => 'false','message_error'=>'Usuario ya suscrito');
				}
				else
				{
					$output= array('success' => 'false','message_error'=>'Materia inexistente','id_error'=>'1');

				}
				return $output;

	}


	public function unsubscribe($id_subject,$id_user){

				$data=array('id_subject' => $id_subject,'id_student'=>$id_user);

				$this->db->where('id_subject', $id_subject);
				$this->db->where('id_student', $id_user);
				$q = $this->db->get('student_subject');
				if ($q->num_rows()>0) {
						$this->db->delete('student_subject', $data); 
						$output= array('success' => 'true', 'message_success'=>'Ha eliminado la  suscripción  a la materia');
				}else
				{
					$output= array('success' => 'false', 'message_error	'=>'Ya no se encuentra suscrito a la materia');

				}
				
				return $output;


	}

	public function get_subjects_student($id_student)
	{	
		$this->db->select('subjects.*');    
		$this->db->from('subjects');
		$this->db->join('student_subject', 'subjects.id = student_subject.id_subject');
		$this->db->where('student_subject.id_student', $id_student);
		$query = $this->db->get();
		if ($query->num_rows()==0){
			$output= array('success' => 'false','message_error'=>'No se encontraron materias inscritas.','id_error'=>'1');
			return $output;
		}
		$subjects=$query->result_array();
		return $subjects;
	}

	public function get_subjects_teacher($id_teacher)
	{	
		$this->db->from('subjects');
		$this->db->where('id_user', $id_teacher);
		$query = $this->db->get();
		if ($query->num_rows()==0){
			$output= array('success' => 'false','message_error'=>'No se encontraron materias inscritas.','id_error'=>'1');
			return $output;
		}
		$subjects=$query->result_array();
		return $subjects;
	}
	public function read_edit($id_user)
	{

		$this->db->from('users');
		$this->db->where('id', $id_user);
		$query = $this->db->get();
		$user=$query->result_array();
		$user[0]['encrypted_password']='';
		return $user[0];

	}
	public function update($username,$encrypted_password,$confirmed_password,$name,$phone,$institution,$user_id)
	{

		
				if ($encrypted_password== $confirmed_password) {

					$data = array(
						'username'=>$username,
						'encrypted_password'=>$encrypted_password,
						'name'=>$name,
						'phone'=>$phone,
						'institution'=>$institution,

						);

					foreach ($data as $key => $value) {
						if ($value=='' or $value==null) {
							unset($data[$key]);
						}
					}

					if (!empty($data)) {
						$this->db->where('id', $user_id);
						$this->db->update('users', $data);
					}
					$output= array('success'=>'true','message_success'=>'Usuario editado correctamente');

				}
				else
				{
					$output= array('success'=>'false','message_error'=>'Las contraseñas no coinciden');
				}
				return $output;



	}





}

/* End of file user.php */
/* Location: ./application/models/user.php */