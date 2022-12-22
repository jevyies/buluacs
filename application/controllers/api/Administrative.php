<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Administrative extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('administrative_model');
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

    public function index_post(){
        if($this->post('principal_name')):
            $data = array(
                'var_id' => $this->post('var_id') ? $this->post('var_id') : " ",
                'principal_name' => $this->post('principal_name') ? $this->post('principal_name') : "",
                'position' => $this->post('position') ? $this->post('position') : "",
                'school_year_from' => $this->post('school_year_from') ? $this->post('school_year_from') : "",
                'school_year_to' => $this->post('school_year_to') ? $this->post('school_year_to') : "",
                'department_name' => $this->post('department_name') ? $this->post('department_name') : "",
                'school_name' => $this->post('school_name') ? $this->post('school_name') : "",
                'division' => $this->post('division') ? $this->post('division') : "",
            );
            $result = $this->administrative_model->save_data($data, $this->audit_data());
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
        elseif($this->post('grades')):
            $data = array(
                'grade_id' => $this->post('grade_id') ? $this->post('grade_id') : " ",
                'level' => $this->post('level') ? $this->post('level') : "",
                'grade' => $this->post('grade') ? $this->post('grade') : "",
                'name' => $this->post('name') ? $this->post('name') : "",
            );
            $result = $this->administrative_model->save_grades($data, $this->audit_data());
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
        elseif($this->post('subjects')):
            $data = array(
                'subject_id' => $this->post('subject_id') ? $this->post('subject_id') : " ",
                'subject_code' => $this->post('subject_code') ? $this->post('subject_code') : "",
                'subject_name' => $this->post('subject_name') ? $this->post('subject_name') : "",
                'is_detail' => $this->post('is_detail') ? $this->post('is_detail') : "N",
                
            );
            $result = $this->administrative_model->save_subjects($data, $this->audit_data());
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
        elseif($this->post('users')):
            $data = array(
                'login_id' => $this->post('login_id') ? $this->post('login_id') : " ",
                'username' => $this->post('username') ? $this->post('username') : "",
                'password' => $this->post('username') ? $this->post('username') : "",
                'grade_id' => $this->post('grade_id'),
                'user_level' => $this->post('user_level'),
                'fullname' => $this->post('fullname') ? $this->post('fullname') : "",
                'fname' => $this->post('fname') ? $this->post('fname') : "",
                'lname' => $this->post('lname') ? $this->post('lname') : "",
                'section_name' => $this->post('section_name') ? $this->post('section_name') : "",
            );
            $result = $this->administrative_model->save_users($data, $this->audit_data());
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
        elseif($this->post('subjectsPerGrade')):
            $data = array(
                'x_id' => $this->post('x_id') ? $this->post('x_id') : " ",
                'subject_id' => $this->post('subject_id'),
                'grade_id' => $this->post('grade_id'),
            );
            $result = $this->administrative_model->save_subject_per_grade($data, $this->audit_data());
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
        endif;
    }

    public function index_get(){
        if($this->get('SV')):
            $result = $this->administrative_model->get_sv_data();
        elseif($this->get('grades')):
            $result = $this->administrative_model->get_grades_data();
        elseif($this->get('subjects')):
            $result = $this->administrative_model->get_subjects_data();
        elseif($this->get('users')):
            $result = $this->administrative_model->get_users_data(); 
        elseif($this->get('subjectsPerGrade')):
            $result = $this->administrative_model->get_subjects_per_grade($this->get('id'));        
        endif;
        $this->returns($result);
    }

    public function index_delete(){
        $str = explode(",", $this->query('id'));
        if($str[0] === 'users'){
            $result = $this->administrative_model->delete_user($str[1], $this->audit_data());
        }elseif($str[0] === 'grade_per_subject'){
            $result = $this->administrative_model->delete_grade_per_subject($str[1], $this->audit_data());
        }
        if ($result):
            $result = array(
                'success' => true,
                'message' => 'Successfully deleted'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        else:
            $result = array(
                'success' => false,
                'message' => 'Failed deleting'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        endif;
    }

}