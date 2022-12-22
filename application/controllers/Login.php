<?php
//we need to start session in order to access it through CI
//session_start();
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';

class Login extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('login_model');
    }
    private function returns($result)
    {
        if ($result) {
            return $this->response($result, REST_Controller::HTTP_OK);
        } else {
            $result = array(
                'message' => 'No data found.',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }
    private function getRealIpAddr()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
    public function index_get() {

        $this->load->view('login');
        
    }

    public function index_post(){

        $data = array(
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password')
            );

        $result = $this->login_model->login_auth($data);
        

        if($result['result']){
            foreach($result['result'] as $data){
                $id = $data->login_id;
                $username = $data->username;
                $password = $data->password;
                $fullname = $data->fullname;
                $section = $data->section_name;
                $grade = $data->name;
                $grade_id = $data->grade_id;
                $level = $data->user_level;
            }
            $session_data = array(
                'id' => $id,
                'username' => $username,
                'password' => $password,
                'fullname' => $fullname,
                'section' => $section,
                'grade' => $grade,
                'grade_id' => $grade_id,
                'level' => $level,
                'ip_address' => $this->getRealIpAddr(),
                'pc_name' => gethostbyaddr($this->getRealIpAddr())
            );
            $this->session->set_userdata('logged_in', $session_data);
            $data = array(
                'message' => 'Successfully Login'
            );
            $this->load->view('template', $data);
        }else{
            if(!$result['username']){
                $data = array(
                    'message' => 'Username is Incorrect'
                );
            }else{
                $data = array(
                    'message' => 'Password is Incorrect'
                );
            }
            $this->load->view('login', $data);
        }
    }

    public function logout_get(){

        $this->session->set_userdata('logged_in');
        if($this->get('session')){
            $data = array(
                'message' => 'Session Expired. Login Again'
            );
        }else{
            $data = array(
                'message' => 'Successfully Logout.'
            );
        }
        return $this->load->view('login', $data);
    }

    public function user_get(){
        $data = $this->session->userdata('logged_in');
        // $records = $this->login_model->get_formlist($data['id']);
        if ($data){
            $result = array(
                'record'=>
                    [
                    'user' => $data['fullname'],
                    'username' =>$data['username'],
                    'section' =>$data['section'],
                    'grade' =>$data['grade'],
                    'level' =>$data['level'],
                    'ip_address' => $this->getRealIpAddr(),
                    'pc_name' => gethostbyaddr($this->getRealIpAddr())
                    ],
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }else{  
            $result = array(
                'login' => false
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }
    }

    public function user_post(){
        if($this->post('edit')){
            $data = array(
                'username' => $this->post('username') ? $this->post('username') : "",
                'fullname' => $this->post('user') ? $this->post('user') : "",
            );
            $result = $this->login_model->update_user($data);
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        }elseif($this->post('changePass')){
            $data = array(
                'password' => $this->post('new') ? $this->post('new') : "",
            );
            $result = $this->login_model->update_password($data, $this->post('old'));
            if($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        }
    }
}