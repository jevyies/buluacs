<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Form_137 extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('form_137_model');
    }

    private function returns($result){
        if($result):
            return $this->response($result, REST_Controller::HTTP_OK);
        else:
            $result = array(
                'message' => 'No data found'
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        endif;
    }

    public function index_get(){
        if($this->get('searchLRN')):
            $result = $this->form_137_model->search_lrn($this->get('LRN'));
        elseif($this->get('searchID')):
            $result = $this->form_137_model->search_id_no($this->get('IDNo')); 
        elseif($this->get('searchName')):
            $data = array(
                'FName' => $this->get('FName') ? $this->get('FName') : '',
                'LName' => $this->get('LName') ? $this->get('LName') : '',
            );
            $result = $this->form_137_model->search_name($data); 
        elseif($this->get('subjects')):
            $result = $this->form_137_model->get_subjects();
        elseif($this->get('grades')):
            $result = $this->form_137_model->get_grades($this->get('id')); 
        elseif($this->get('histories')):
            $result = $this->form_137_model->get_histories($this->get('id')); 
        elseif($this->get('CBA')):
            $result = $this->form_137_model->get_cbas($this->get('id'));
        elseif($this->get('attendance')):
            $result = $this->form_137_model->get_attendance($this->get('id')); 
        endif;
        $this->returns($result);
    }
}