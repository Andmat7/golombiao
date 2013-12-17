<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends CI_Model {


	public function new_user($first_name,$last_name,$age,$gender,$email,$city,$study,$school_level,$encrypted_password,$departamento,$fb_id)
	{	

		$this->db->where('email', $email);
		$q = $this->db->get('users');
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();
			$output=false;
		}
		else
		{
			$data = array(
					'first_name'=>$first_name,
					'last_name'=>$last_name,
					'age'=>$age,
					'gender'=>$gender,
					'email'=>$email,
					'city'=>$city,
					'study'=>$study,
					'school_level'=>$school_level,
					'encrypted_password'=>$encrypted_password,
					'departamento'=>$departamento,
					'fb_id'=>$fb_id
					
			);
			$this->db->insert('users',$data);
			$output=true;
		}



		return $output;
	}
	public function verify_register($email,$fb_id)
	{
		$fb_id=intval ( $fb_id );
		$this->db->where('email', $email);
		$q = $this->db->get('users');
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();
			

			if($user[0]['fb_id']!=$fb_id){
				$data = array(               
					'fb_id'=> $fb_id,
				);
				$this->db->where('email', $email);
				$this->db->update('users', $data);

			}
			
			$this->db->where('email', $email);
			$q = $this->db->get('users');
			$user=$q->result_array();
			$user[0]['success']='true';
			
			return $user[0];
			
			
		}else{
			$output= array('success' => 'false');
			return $output;
			
		}
		

		
	}






	public function login($email,$encrypted_password)
	{	
		$this->db->where('email', $email);
		$this->db->where('encrypted_password', $encrypted_password);
		$q = $this->db->get('users');
		if($q -> num_rows() == 1)
		{
			$user=$q->result_array();

			
			$this->db->where('idCiudad', $user[0]["city"]);
			$q = $this->db->get('ciudades');
			$ciudad=$q->result_array();

			$user[0]["city"]=$ciudad[0]["nombre"];




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

	public function sel_city($id)
	{
				$this->db->where('idDepartamento', $id);
				$q = $this->db->get('ciudades');
				$cities=$q->result_array();
				
					$output= $cities;
				
				return $output;



	}





}

/* End of file user.php */
/* Location: ./application/models/user.php */