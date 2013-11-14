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

	function do_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png|jpeg|JPEG|JPG';
		$config['max_size']	= '0';
		$config['max_width']  = '0';
		$config['max_height']  = '0';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload())
		{
			$error = array('message_success' => $this->upload->display_errors());

			$imprimir=json_encode($error);
				echo $imprimir;
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());


			$output= array(
							'success' => 'true',
							'message_success' => 'la foto se ha subido correctamente',
							);

			$imprimir=json_encode($output);
				echo $imprimir;
		}
	}
}
?>


