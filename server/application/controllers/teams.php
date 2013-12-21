<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Teams extends MY_Controller {
	function __construct()
	{

		ini_set('display_errors', 'On');
		parent::__construct();
		$this->load->model('team','',TRUE);
	}


	public function myTeams(){
		$json_reply=$this->team->myTeams($this->_USER['id']);
		echo json_encode($json_reply);




	}


	public function deleteTeam(){


			$id= $this->input->post('id_team');
			$json_reply=$this->team->deleteTeam($id,$this->_USER['id']);
			echo json_encode($json_reply);

	}

		public function deleteSubscription(){


			$id= $this->input->post('id_team');
			$json_reply=$this->team->deleteSubscription($id,$this->_USER['id']);
			echo json_encode($json_reply);

	}


		public function get_players(){

		
			$id= $this->input->post('team_id');
			$json_reply=$this->team->get_players($id,$this->_USER['id']);
			echo json_encode($json_reply);




	}




	public function new_team()
	{
		$name= $this->input->post('name');
		$departamento= $this->input->post('departamento');
		$zone_team= $this->input->post('zone_team');
		$description= $this->input->post('descripcion');
		$ciudad= $this->input->post('ciudad');
		$output=$this->team->new_team($name,$departamento,$ciudad,$zone_team,$description,$this->_USER['id']);
		if($output){

			$team_id=$this->db->insert_id();
			$result=$this->team->add_user($this->_USER['id'],$team_id);
			if($result){
				$json_reply["name_team"]=$name;	
				$json_reply["team_id"]=$team_id;
				$json_reply["error"]=false;
			}

		}else{
			$json_reply["message_error"]="Solo puede inscribir maximo 3 equipos";
			$json_reply["error"]=true;



		}
		
		
		//$json_reply['message_error']="Email y password requeridos";
		echo json_encode($json_reply);
		//echo $output;
	}


 public function userData(){
 	$id_user= $this->input->post('id_user');
 	$output=$this->team->userData($id_user);
		echo json_encode($output);

 }









	public function get_fromcity()
	{




		$id_city= $this->input->post('id_city');
		$output=$this->team->select_from_city($id_city,$this->_USER['id']);
		echo json_encode($output);
		
	}
	public function suscribe()
	{
		$team_id= $this->input->post('team_id');
		$result=$this->team->add_user($this->_USER['id'],$team_id);
		if(!$result["error"]){

			$result["team_id"]=$team_id;
		}
		echo json_encode($result);
	}


	public function verify_team()
	{
		
		$result=$this->team->verify_team($this->_USER['id']);


		echo json_encode($result);
	}

	
	public function conv_team()
	{		
		$tipo_consulta= $this->input->post('tipo_consulta');
		$result=$this->team->verify_convocatory($this->_USER['id'], $tipo_consulta);
		echo json_encode($result);
	}


	public function guardar_convocatoria()	{		
		$datos = array('equipo_1' => $this->input->post('equipo_1'),
			'equipo_2' => $this->input->post('equipo_2'),
			'fecha' => $this->input->post('fecha'),
			'hora' => $this->input->post('hora'),
			'latitud' => $this->input->post('latitud'),
			'longitud' => $this->input->post('longitud'),
			'principio' => $this->input->post('principio'),
			'tipo_juego' => $this->input->post('tipo_juego'),
			);

		$result=$this->team->guardar_convocatoria($datos);
		
		$tipodepartido=array(
			'1'=>"Basquetball",
			'2'=>"Ultimate",
			'3'=>"Micro",
			'4'=>"Futbol",
			);


		$equipo_1=$this->team->get_team($this->input->post('equipo_1'));
		$equipo_2=$this->team->get_team($this->input->post('equipo_2'));
		$leader=$this->team->getData($equipo_2['leader_id']);
		$full_name=$leader['first_name']." ". $leader['last_name'];
		
		$mensaje = " Hola ".$full_name.", Revisa tu aplicación de golombiao ya que el equipo, ".$equipo_1['name']." ha convocatdo a tu equipo ".$equipo_2['name'].",  el dia ".$this->input->post('fecha').', a las '.$this->input->post('hora') .' para un partido de '.$tipodepartido[$this->input->post('tipo_juego')];

		$email_from = $leader['email'];
		//ini_set(sendmail_from,'info@golombiao.com');
		//$full_name = 'un usuario x';
		
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

		$headers = 'From: golombiao@golombiao.com' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
		// Send
		if(mail($leader['email'], 'Te han enviado una convocatoria de Golombiao', $mensaje,$headers) ){
			$return['email_enviado']=true;
		    
		}else{
			$return['email_enviado']=false;
		}
	
		echo json_encode($result);
	}


	public function guardar_resultados()	{		
		$datos = array('id_user' => $this->_USER['id'],
			'id_conv' => $this->input->post('id_conv'),
			'asesor' => $this->input->post('asesor'),
			'id_equipo' => $this->input->post('id_equipo'),
			'principio' => $this->input->post('principio'),
			'barra' => $this->input->post('barra'),
			'cump_acuerdos' => $this->input->post('cump_acuerdos'),
			'faltas' => $this->input->post('faltas'),
			'meritos' => $this->input->post('meritos'),
			'no_players_presents' => $this->input->post('no_players_presents'),
			'no_players' => $this->input->post('no_players'),
			'autoevaluacion' => $this->input->post('autoevaluacion'),
			'otherTeam' => $this->input->post('otherTeam')
			);

		$existen_resultados=$this->team->existen_resultados($datos['id_user'], $datos['id_conv']);


		if(!$existen_resultados["error"]) {
			$updatePoints=$this->team->guardar_resultados($datos);
			if ($updatePoints) {

				$result = $this->team->resultsRequests($datos['id_conv']);
				$this->team->savePoints($result);

			}



			$result['error']=false;
		} else {
			$result['error']=true;
		}
		echo json_encode($result);
	}

	public function existen_resultados() {
		$id_conv = $this->input->post('id_conv');
		$id_user = $this->_USER['id'];
		$existen_resultados = $this->team->existen_resultados($id_user, $id_conv);
		$existen_resultados['error'] = !$existen_resultados['error'];
		echo json_encode($existen_resultados);
	}

	public function promedio_resultados() {
		$id_conv = $this->input->post('id_conv');
		$result = $this->team->promedio_resultados($id_conv);
		echo json_encode($result);
	}
	public function maps_convocatoria() {
		$result = $this->team->maps_convocatoria();
		echo json_encode($result);
	}



	function do_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']	= '100';
		$config['max_width']  = '1024';
		$config['max_height']  = '768';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload())
		{	
			$error = array('error' => $this->upload->display_errors());
			print_r($error);
			exit();
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());
			print_r($data);
			exit();
		}
	}



	public function aceptRequest() {
		$id_conv = $this->input->post('id_conv');
		$id_user = $this->_USER['id'];
		$result = $this->team->aceptRequest($id_user,$id_conv);
		echo json_encode($result);
	}
	public function deleteRequest() {
		$id_conv = $this->input->post('id_conv');
		$id_user = $this->_USER['id'];
		$result = $this->team->deleteRequest($id_user,$id_conv);
		echo json_encode($result);
	}



	public function resultsRequests(){
		$id_conv = $this->input->post('id_conv');
		$result = $this->team->resultsRequests($id_conv);
		echo json_encode($result);
	}

	public function getData(){
		$id_user = $this->_USER['id'];
		$result = $this->team->getData($id_user);
		echo json_encode($result);
	}


	public function getImagesNames(){

		$result = $this->team->getImagesNames();
		echo json_encode($result);

	}


}

/* End of file controllername.php */
/* Location: ./application/controllers/controllername.php */