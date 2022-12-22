<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class History extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('history_model');
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
        if($this->get('students')):
            $result = $this->history_model->get_students();
        elseif($this->get('more')):
            $result = $this->history_model->get_more_students($this->get('number')); 
        elseif($this->get('history')):
            $result = $this->history_model->get_history($this->get('id')); 
        endif;
        $this->returns($result);
    }

    public function index_post(){
        if($this->post('student')):
            $data = array(
                'student_id' => $this->post('student_id') ? $this->post('student_id') : " ",
                'firstname' => $this->post('firstname') ? $this->post('firstname') : "",
                'lastname' => $this->post('lastname') ? $this->post('lastname') : "",
                'middlename' => $this->post('middlename') ? $this->post('middlename') : "",
                'extname' => $this->post('extname') ? $this->post('extname') : "",
                'dob' => $this->post('dob') ? $this->post('dob') : "",
                'guardian' => $this->post('guardian') ? $this->post('guardian') : "",
                'guardian_address' => $this->post('guardian_address') ? $this->post('guardian_address') : "",
                'guardian_occupation' => $this->post('guardian_occupation') ? $this->post('guardian_occupation') : "",
                'sex' => $this->post('sex') ? $this->post('sex') : "",
                'id_no' => $this->post('id_no') ? $this->post('id_no') : "",
                'lrn' => $this->post('lrn') ? $this->post('lrn') : "",
                'address' => $this->post('address') ? $this->post('address') : "",
                'date_of_entrance' => $this->post('date_of_entrance') ? $this->post('date_of_entrance') : "",
            );
            $result = $this->history_model->save_student($data);
            if($result['exist']):
                $result = array(
                    'exist' => true,
                    'success' => false,
                    'message' => 'LRN already exists.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif ($result['id']):
                $result = array(
                    'success' => true,
                    'id' => $result['id'],
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('history')):
            $data = array(
                'history_id' => $this->post('history_id') ? $this->post('history_id') : " ",
                'student_id' => $this->post('student_id') ? $this->post('student_id') : "",
                'teacher_name' => $this->post('teacher_name') ? $this->post('teacher_name') : "",
                'section_name' => $this->post('section_name') ? $this->post('section_name') : "",
                'level_name' => $this->post('level_name') ? $this->post('level_name') : "",
                'sex' => $this->post('sex') ? $this->post('sex') : "",
                'age' => $this->post('age') ? $this->post('age') : "",
                'status' => $this->post('status') ? $this->post('status') : "PREVIOUS",
                'school_year' => $this->post('school_year') ? $this->post('school_year') : "",
                'school_name' => $this->post('school_name') ? $this->post('school_name') : "",
                'principal' => $this->post('principal') ? $this->post('principal') : "",
                'grade' => $this->post('grade') ? $this->post('grade') : "",
            );
            $result = $this->history_model->save_history($data, $this->post('teacher'));
            if ($result['id']):
                $result = array(
                    'success' => true,
                    'id' => $result['id'],
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('delHis')):
            $result = $this->history_model->delete_history($this->post('id'));
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully deleted.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Error. Failed Deleting.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('delStudent')):
            $result = $this->history_model->delete_student($this->post('id'));
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully deleted.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Error. Failed Deleting.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        endif;
    }
}