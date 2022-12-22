<?php

class Form_137_Model extends CI_Model
{
    public function search_lrn($lrn){
        $this->db->select('*')->from('tblstudent')->like('lrn', $lrn);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function search_id_no($id){
        $this->db->select('*')->from('tblstudent')->like('id_no', $id);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function search_name($data){
        $this->db->select('*')->from('tblstudent')->like('lastname', $data['LName'])->like('firstname', $data['FName']);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function get_subjects(){
        $query = $this->db
        ->select('a.*, b.*')
        ->from('tblsubjects a, tblgrade b, tblgradexsubject c')
        ->where('c.subject_id = a.subject_id')
        ->where('c.grade_id = b.grade_id')
        ->get();
        return $query->result() ? $query->result() : false;
    }

    public function get_grades($id){
        $query = $this->db
        ->select('a.level_name AS name, b.*, c.is_detail')
        ->from('tblstudenthistory a, tblstudentcardfrontleft b, tblsubjects c')
        ->where('a.student_id', $id)
        ->where('a.history_id = b.history_id')
        ->where('b.subject_name = c.subject_name')
        ->order_by('card_id', 'asc')
        ->get();
        return $query->result() ? $query->result() : false;
    }

    public function get_histories($id){
        $query = $this->db
        ->select('*')
        ->from('tblstudenthistory')
        ->where('student_id', $id)
        ->order_by('level_name', 'asc')
        ->get();
        return $query->result() ? $query->result() : false;
    }

    public function get_cbas($id){
        $query = $this->db
        ->select('a.*')
        ->from('tblstudentcardfrontright a, tblstudenthistory b')
        ->where('b.student_id', $id)
        ->where('b.history_id = a.history_id')
        ->order_by('b.level_name', 'asc')
        ->get();
        return $query->result() ? $query->result() : false;
    }

    public function get_attendance($id){
        $query = $this->db
        ->select('a.*, b.level_name')
        ->from('tblstudentattendance a, tblstudenthistory b')
        ->where('b.student_id', $id)
        ->where('b.history_id = a.history_id')
        ->order_by('b.level_name', 'asc')
        ->get();
        return $query->result() ? $query->result() : false;
    }
}