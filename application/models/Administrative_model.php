<?php

class Administrative_Model extends CI_Model
{

    public function get_sv_data(){
        $this->db->select('*');
        $this->db->from('tblstaticvariables');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_subjects_per_grade($id){
        $this->db->select('*');
        $this->db->from('tblgradexsubject a, tblsubjects b');
        $this->db->where('a.grade_id', $id);
        $this->db->where('a.subject_id = b.subject_id');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_grades_data(){
        $subjects = 'SELECT COUNT(b.x_id) FROM tblgradexsubject b WHERE a.grade_id = b.grade_id';
        $this->db->select('a.*, ('.$subjects.') AS subNo');
        $this->db->from('tblgrade a');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_subjects_data(){
        $this->db->select('*');
        $this->db->from('tblsubjects');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_users_data(){
        $this->db->select('a.*, b.name');
        $this->db->from('tbllogin a, tblgrade b');
        $this->db->where('a.grade_id = b.grade_id');
        $this->db->order_by('a.user_level', 'asc');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function save_data($data)
    {
        $this->db->select("*");
        $this->db->from("tblstaticvariables");
        $this->db->where("var_id", $data['var_id']);
        $query = $this->db->get();
        if($query->result()):
            $this->db->where('var_id', $data['var_id']);
            $this->db->update('tblstaticvariables', $data);
            if ($this->db->affected_rows()):
                return true;
            else:
                return false;
            endif;
        else:
            $this->db->insert('tblstaticvariables', $data);
            if ($this->db->affected_rows()):
                return array('id' => $this->db->insert_id());
            else:
                return false;
            endif;
        endif;
    }

    public function save_grades($data){
        $this->db->select("*");
        $this->db->from("tblgrade");
        $this->db->where("grade_id", $data['grade_id']);
        $query = $this->db->get();
        if($query->result()):
            $this->db->where('grade_id', $data['grade_id']);
            $this->db->update('tblgrade', $data);
            if ($this->db->affected_rows()):
                return true;
            else:
                return false;
            endif;
        else:
            $this->db->insert('tblgrade', $data);
            if ($this->db->affected_rows()):
                return array('id' => $this->db->insert_id());
            else:
                return false;
            endif;
        endif;
    }

    public function save_subjects($data){
        $this->db->select("*");
        $this->db->from("tblsubjects");
        $this->db->where("subject_id", $data['subject_id']);
        $query = $this->db->get();
        if($query->result()):
            $this->db->where('subject_id', $data['subject_id']);
            $this->db->update('tblsubjects', $data);
            if ($this->db->affected_rows()):
                return true;
            else:
                return false;
            endif;
        else:
            $this->db->insert('tblsubjects', $data);
            if ($this->db->affected_rows()):
                return array('id' => $this->db->insert_id());
            else:
                return false;
            endif;
        endif;
    }

    public function save_subject_per_grade($data){
        if($data['x_id'] != " "):
            $this->db->where('x_id', $data['x_id']);
            $this->db->update('tblgradexsubject', $data);
            if ($this->db->affected_rows()):
                return true;
            else:
                return false;
            endif;
        else:
            $this->db->insert('tblgradexsubject', $data);
            if ($this->db->affected_rows()):
                return array('id' => $this->db->insert_id());
            else:
                return false;
            endif;
        endif;
    }
    public function save_users($data){
        if($data['login_id'] != " "):
            $this->db->where('login_id', $data['login_id']);
            $this->db->update('tbllogin', $data);
            if ($this->db->affected_rows()):
                return true;
            else:
                return false;
            endif;
        else:
            $this->db->insert('tbllogin', $data);
            if ($this->db->affected_rows()):
                return array('id' => $this->db->insert_id());
            else:
                return false;
            endif;
        endif;
    }

    public function delete_user($id){
        $this->db->select("*");
        $this->db->from("tbllogin");
        $this->db->where("login_id", $id);
        $query = $this->db->get();
        if($query->result()):
            $this->db->where("login_id", $id);
            $this->db->delete("tbllogin");
            return true;
        else:
            return false;
        endif;
    }

    public function delete_grade_per_subject($id){
        $this->db->where("x_id", $id);
        $this->db->delete("tblgradexsubject");
        if($this->db->affected_rows()):
            return true;
        else:
            return false;
        endif;
    }
}
