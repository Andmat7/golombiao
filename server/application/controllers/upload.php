<?php

class Upload extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
	}

	function index()
	{
		$this->load->view('upload_form', array('error' => ' ' ));
	}
	function add_description()
	{

		$this->db->where('id', $this->input->post('image_id'));
    	$this->db->update('images', array(    		
			'description' => $this->input->post('description')
    	));
    	$output= array(
							'success' => 'true',
							'message_success' => 'se ha subido correctamente el mensaja'
		);
    $imprimir=json_encode($output);
	echo $imprimir;
	}
	function do_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png|jpeg|JPEG|JPG';
		//$config['max_size']	= '0';
		//$config['max_width']  = '0';
		//$config['max_height']  = '0';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload())
		{
			$data = $this->upload->data();
			$error = array(
				'message_success' => $this->upload->display_errors(),
				'file'=>$data["file_name"],


				);


			$imprimir=json_encode($error);
				echo $imprimir;
		}
		else
		{
			$data = $this->upload->data();
			$nameImage=array('name' => $data["file_name"]);

			$this->db->insert('images',$nameImage);
			
			$output= array(
							'success' => 'true',
							'message_success' => 'la foto se ha subido correctamente',
							'id_image' => $this->db->insert_id()
							);

			$imprimir=json_encode($output);
				echo $imprimir;
		}
	}
}
?>


