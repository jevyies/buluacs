<?php

class History_Model extends CI_Model
{
    public function get_students(){
        $this->db->select('*');
        $this->db->from('tblstudent');
        $this->db->order_by('lastname', 'asc');
        $this->db->order_by('firstname', 'asc');
        $this->db->limit(10);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_more_students($number){
        $this->db->select('*');
        $this->db->from('tblstudent');
        $this->db->order_by('lastname', 'asc');
        $this->db->order_by('firstname', 'asc');
        $this->db->limit(3, $number);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_history($id){
        //history
        $this->db->select('*');
        $this->db->from('tblstudenthistory');
        $this->db->where('student_id', $id);
        $this->db->order_by('grade', 'asc');
        $query = $this->db->get();
        //subjects
        $this->db->select('a.*');
        $this->db->from('tblstudentcardfrontleft a, tblstudenthistory b');
        $this->db->where('b.history_id = a.history_id');
        $this->db->where('b.student_id', $id);
        $this->db->order_by('card_id', 'asc');
        $query1 = $this->db->get();
        //moral
        $this->db->select('a.*');
        $this->db->from('tblstudentcardfrontright a, tblstudenthistory b');
        $this->db->where('b.history_id = a.history_id');
        $this->db->where('b.student_id', $id);
        $this->db->order_by('card_id', 'asc');
        $query2 = $this->db->get();
        //attendance
        $this->db->select('a.*');
        $this->db->from('tblstudentattendance a, tblstudenthistory b');
        $this->db->where('b.history_id = a.history_id');
        $this->db->where('b.student_id', $id);
        $this->db->order_by('card_id', 'asc');
        $query3 = $this->db->get();
        return array(
            'history' => $query->result() ?  $query->result() : [],
            'subjects' => $query1->result() ?  $query1->result() : [],
            'moral' => $query2->result() ?  $query2->result() : [],
            'attendance' => $query3->result() ?  $query3->result() : [],
        );
    }

    public function get_card_data($id){
        $this->db->select('*')->from('tblstudentcardfrontleft')->where('history_id', $id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function save_student($data){
        if($data['lrn']){
            $exists = $this->db->select('*')->from('tblstudent')->where('lrn', $data['lrn'])->get();
            if($exists->result()){
                return array('exist' => true);
            }
        }
        if($data['student_id'] != " "):
            $this->db->where('student_id', $data['student_id'])->update('tblstudent', $data);
            return $this->db->affected_rows() ? true : false;
        else:
            $this->db->insert('tblstudent', $data);
            if($this->db->affected_rows()):
                $id = $this->db->insert_id();
                return array('id' => $id, 'exist' => false);
            else:
                return false;
            endif;
        endif;
    }

    public function save_history($data, $teacher_id){
        if($data['history_id'] != " "):
            $this->db->where('history_id', $data['history_id']);
            $this->db->update('tblstudenthistory', $data);
            return $this->db->affected_rows() ? true : false;
        else:
            $this->db
            ->where('student_id', $data['student_id'])
            ->update('tblteacherxstudent', array('status' => 'PREVIOUS'));
            $this->db
            ->where('student_id', $data['student_id'])
            ->update('tblstudenthistory', array('status' => 'PREVIOUS'));
            if($data['status'] == 'ACTIVE'){
                $data1 = array(
                    'student_id' => $data['student_id'], 
                    'teacher_id' => $teacher_id, 
                    'status' => 'ACTIVE', 
                );
                $this->db->insert('tblteacherxstudent', $data1);
            }
            $this->db->insert('tblstudenthistory', $data);
            if($this->db->affected_rows()):
                $id = $this->db->insert_id();
                $this->db->select('c.*');
                $this->db->from('tblgradexsubject a, tblsubjects c');
                $this->db->where('a.subject_id = c.subject_id');
                $this->db->where('a.grade_id', $data['grade']);
                $query = $this->db->get();
                if($query->result()){
                    $data3 = array('history_id' => $id);
                    foreach($query->result() as $record){
                        $data3['subject_name'] = $record->subject_name;
                        $this->db->insert('tblstudentcardfrontleft', $data3);
                    }
                }
                $data4 = array('history_id' => $id);
                $this->db->insert('tblstudentcardfrontright', $data4);
                $data5 = array('history_id' => $id, 'particulars' => 'No. of School days');
                $this->db->insert('tblstudentattendance', $data5);
                $data6 = array('history_id' => $id, 'particulars' => 'No. of days present');
                $this->db->insert('tblstudentattendance', $data6);
                $data7 = array('history_id' => $id, 'particulars' => 'No. of days absent');
                $this->db->insert('tblstudentattendance', $data7);
                return array('id' => $id);
            else:
                return false;
            endif;
        endif;
    }

    public function delete_history($id){
        $this->db->where('history_id',$id);
        $this->db->delete('tblstudentcardfrontleft');

        $this->db->where('history_id',$id);
        $this->db->delete('tblstudentcardfrontright');

        $this->db->where('history_id',$id);
        $this->db->delete('tblstudentattendance');

        $this->db->where('history_id',$id);
        $this->db->delete('tblstudenthistory');

        if($this->db->affected_rows()):
            return true;
        else: 
            return false;
        endif;
    }

    public function delete_student($id){
        $query = $this->db->select('*')->from('tblstudenthistory')->where('student_id', $id)->get();
        if($query->result()){
            foreach($query->result() as $record){
                $this->db->where('history_id', $record->history_id)->delete('tblstudentcardfrontleft');
                $this->db->where('history_id', $record->history_id)->delete('tblstudentcardfrontright');
                $this->db->where('history_id', $record->history_id)->delete('tblstudentattendance');
                $this->db->where('history_id', $record->history_id)->delete('tblstudenthistory');
            }
        }
        $this->db->where('student_id', $id)->delete('tblteacherxstudent');
        $this->db->where('student_id', $id)->delete('tblstudent');
        
        if($this->db->affected_rows()):
            return true;
        else: 
            return false;
        endif;
    }
}