<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Students extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('students_model');
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
            $result = $this->students_model->get_students();
        elseif($this->get('more')):
            $result = $this->students_model->get_more_students($this->get('number')); 
        elseif($this->get('card')):
            $result = $this->students_model->get_card_data($this->get('id'));
        elseif($this->get('searchLRN')):
            $result = $this->students_model->search_lrn($this->get('LRN'));
        elseif($this->get('searchID')):
            $result = $this->students_model->search_id_no($this->get('IDNo')); 
        elseif($this->get('searchName')):
            $data = array(
                'FName' => $this->get('FName') ? $this->get('FName') : '',
                'LName' => $this->get('LName') ? $this->get('LName') : '',
            );
            $result = $this->students_model->search_name($data); 
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
            $details = array(
                'school_year' => $this->post('school_year'),
                'principal' => $this->post('principal'),
                'age' => $this->post('age'),
                'school_name' => $this->post('school_name')
            );
            $result = $this->students_model->save_student($data, $details);
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
                    'history' => $result['history'],
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
        elseif($this->post('side') == 1):
            $card = $this->post('arrayNi');
            $result = $this->students_model->save_card($card);   
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('side') == 2):
            $data = array(
                'card_id' => $this->post('card_id') ? $this->post('card_id') : " ",
                'MakaDiyosA1' => $this->post('MakaDiyosA1') ? $this->post('MakaDiyosA1') : "",
                'MakaDiyosA2' => $this->post('MakaDiyosA2') ? $this->post('MakaDiyosA2') : "",
                'MakaDiyosA3' => $this->post('MakaDiyosA3') ? $this->post('MakaDiyosA3') : "",
                'MakaDiyosA4' => $this->post('MakaDiyosA4') ? $this->post('MakaDiyosA4') : "",
                'MakaDiyosB1' => $this->post('MakaDiyosB1') ? $this->post('MakaDiyosB1') : "",
                'MakaDiyosB2' => $this->post('MakaDiyosB2') ? $this->post('MakaDiyosB2') : "",
                'MakaDiyosB3' => $this->post('MakaDiyosB3') ? $this->post('MakaDiyosB3') : "",
                'MakaDiyosB4' => $this->post('MakaDiyosB4') ? $this->post('MakaDiyosB4') : "",
                'MakaTaoA1' => $this->post('MakaTaoA1') ? $this->post('MakaTaoA1') : "",
                'MakaTaoA2' => $this->post('MakaTaoA2') ? $this->post('MakaTaoA2') : "",
                'MakaTaoA3' => $this->post('MakaTaoA3') ? $this->post('MakaTaoA3') : "",
                'MakaTaoA4' => $this->post('MakaTaoA4') ? $this->post('MakaTaoA4') : "",
                'MakaTaoB1' => $this->post('MakaTaoB1') ? $this->post('MakaTaoB1') : "",
                'MakaTaoB2' => $this->post('MakaTaoB2') ? $this->post('MakaTaoB2') : "",
                'MakaTaoB3' => $this->post('MakaTaoB3') ? $this->post('MakaTaoB3') : "",
                'MakaTaoB4' => $this->post('MakaTaoB4') ? $this->post('MakaTaoB4') : "",
                'Makakalikasan1' => $this->post('Makakalikasan1') ? $this->post('Makakalikasan1') : "",
                'Makakalikasan2' => $this->post('Makakalikasan2') ? $this->post('Makakalikasan2') : "",
                'Makakalikasan3' => $this->post('Makakalikasan3') ? $this->post('Makakalikasan3') : "",
                'Makakalikasan4' => $this->post('Makakalikasan4') ? $this->post('Makakalikasan4') : "",
                'MakaBansaA1' => $this->post('MakaBansaA1') ? $this->post('MakaBansaA1') : "",
                'MakaBansaA2' => $this->post('MakaBansaA2') ? $this->post('MakaBansaA2') : "",
                'MakaBansaA3' => $this->post('MakaBansaA3') ? $this->post('MakaBansaA3') : "",
                'MakaBansaA4' => $this->post('MakaBansaA4') ? $this->post('MakaBansaA4') : "",
                'MakaBansaB1' => $this->post('MakaBansaB1') ? $this->post('MakaBansaB1') : "",
                'MakaBansaB2' => $this->post('MakaBansaB2') ? $this->post('MakaBansaB2') : "",
                'MakaBansaB3' => $this->post('MakaBansaB3') ? $this->post('MakaBansaB3') : "",
                'MakaBansaB4' => $this->post('MakaBansaB4') ? $this->post('MakaBansaB4') : "",
                'history_id' => $this->post('history_id') ? $this->post('history_id') : "",   
            );
            
            $result = $this->students_model->save_cardright($data);   
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('side') == 3):
            $attendance = $this->post('arrayNi');
            $result = $this->students_model->save_attendance($attendance);   
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully saved.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('delStudent')):
            $result = $this->students_model->delete_student($this->post('id'));
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
        elseif($this->post('export')):
            $data = array(
                'student_id' => $this->post('student_id'),
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
            $details = array(
                'school_year' => $this->post('school_year'),
                'principal' => $this->post('principal'),
                'age' => $this->post('age'),
                'school_name' => $this->post('school_name'),
                'history_id' => $this->post('history_id'),
            );
            $result = $this->students_model->export_student($data, $details);
            if($result):
                $result = array(
                    'history' => $details['history_id'],
                    'success' => true,
                    'message' => 'Successfully imported'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        elseif($this->post('nextLvl')):
            $result = $this->students_model->student_next_lvl($this->post('ids'));
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully sent'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Nothing has changed. Failed Saving.'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        endif;
    }
}