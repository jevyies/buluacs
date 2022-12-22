<?php

Class Login_Model extends CI_Model {

    public function login_auth($data) {
        // $query = $this->db->select('*')->from('tbllogin')->get();
        // if($query->result()){
        //     foreach($query->result() as $record){
        //         $this->db->where("login_id", $record->login_id)->update('tbllogin', array('password' => $record->section_name));
        //     }
        // }
        $condition = "username =" . "'" . $data['username'] . "'";
        $this->db->select('*');
        $this->db->from('tbllogin');
        $this->db->where($condition);
        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return array('username' => false, 'password' => true, 'result' => []);
        }else{
            $this->db->select('*');
            $this->db->from('tbllogin a, tblgrade b');
            $this->db->where('password', $data['password']);
            $this->db->where('username', $data['username']);
            $this->db->where('a.grade_id = b.grade_id');
            $query = $this->db->get();
            if ($query->num_rows() == 0) {
                return array('password' => false, 'username' => true, 'result' => []);
            }else{
                return array('password' => true, 'username' => true, 'result' => $query->result());
            }
        }
    }

    public function update_user($data) {
        $sess = $this->session->userdata('logged_in');
        $this->db->select('*');
        $this->db->from('tbllogin');
        $this->db->where('login_id', $sess['id']);
        $query = $this->db->get();
        if ($query->result()) {
            $this->db->where('login_id', $sess['id']);
            $this->db->update('tbllogin', $data);
            return true;
        }else {
            return false;
        }
    }

    public function update_password($data, $old){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('*');
        $this->db->from('tbllogin');
        $this->db->where('login_id', $sess['id']);
        $query = $this->db->get();
        if ($query->result()) {
            $password = true;
            foreach($query->result() as $record){
                if($record->password != $old){
                    $password = false;
                }
            }
            if(!$password){
                return false;
            }
            $this->db->where('login_id', $sess['id']);
            $this->db->update('tbllogin', $data);
            return true;
        }else {
            return false;
        }
    }
}