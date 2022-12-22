<?php

class Students_Model extends CI_Model
{
    public function get_students(){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('a.*, b.*, c.history_id');
        $this->db->from('tblstudent a, tblteacherxstudent b, tblstudenthistory c');
        $this->db->where('a.student_id = b.student_id');
        $this->db->where('a.student_id = c.student_id');
        $this->db->where('b.teacher_id', $sess['id']);
        $this->db->where('b.status', 'ACTIVE');
        $this->db->where('c.status', 'ACTIVE');
        $this->db->order_by('a.sex', 'desc');
        $this->db->order_by('a.lastname', 'asc');
        $this->db->limit(10);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_more_students($number){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('a.*, b.*, c.history_id');
        $this->db->from('tblstudent a, tblteacherxstudent b, tblstudenthistory c');
        $this->db->where('a.student_id = b.student_id');
        $this->db->where('a.student_id = c.student_id');
        $this->db->where('b.teacher_id', $sess['id']);
        $this->db->where('b.status', 'ACTIVE');
        $this->db->where('c.status', 'ACTIVE');
        $this->db->order_by('a.sex', 'desc');
        $this->db->order_by('a.lastname', 'asc');
        $this->db->limit(3, $number);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function search_lrn($lrn){
        $sess = $this->session->userdata('logged_in');
        $this->db
        ->select('a.*, b.history_id')
        ->from('tblstudent a, tblstudenthistory b')
        ->where('a.student_id = b.student_id')
        ->where('b.status', 'READY')
        ->where('b.grade', $sess['grade_id'])
        ->like('lrn', $lrn);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function search_id_no($id){
        $sess = $this->session->userdata('logged_in');
        $this->db
        ->select('a.*, b.history_id')
        ->from('tblstudent a, tblstudenthistory b')
        ->where('a.student_id = b.student_id')
        ->where('b.status', 'READY')
        ->where('b.grade', $sess['grade_id'])
        ->like('id_no', $id);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function search_name($data){
        $sess = $this->session->userdata('logged_in');
        $this->db
        ->select('a.*, b.history_id')
        ->from('tblstudent a, tblstudenthistory b')
        ->where('a.student_id = b.student_id')
        ->where('b.status', 'READY')
        ->where('b.grade', $sess['grade_id'])
        ->like('lastname', $data['LName'])
        ->like('firstname', $data['FName']);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }
    
    public function get_card_data($id){
        $this->db->select('*')->from('tblstudentcardfrontleft')->where('history_id', $id);
        $query = $this->db->get();
        $this->db->select('*')->from('tblstudentcardfrontright')->where('history_id', $id);
        $query1 = $this->db->get();
        $this->db->select('*')->from('tblstudentattendance')->where('history_id', $id);
        $query2 = $this->db->get();
        return array(
            'left' => $query->result() ?  $query->result() : [],
            'right' => $query1->result() ?  $query1->result() : [],
            'attendance' => $query2->result() ?  $query2->result() : [],
        );
    }

    public function save_card($array)
    {
        foreach ($array as $values){
            $data_update = array(
                'card_id' => $values['card_id'],
                'subject_name' => $values['subject_name'],
                'first_grading' => $values['first_grading'],
                'second_grading' => $values['second_grading'],
                'third_grading' => $values['third_grading'],
                'fourth_grading' => $values['fourth_grading'],
                'average' => $values['average'],
                'remarks' => $values['remarks'],
                'history_id' => $values['history_id'],
            );
            $this->db->where('card_id', $values['card_id']);
            $this->db->update('tblstudentcardfrontleft', $data_update);
        }
        return true;
    }

    public function save_cardright($data)
    {
        $this->db->where('card_id', $data['card_id']);
        $this->db->update('tblstudentcardfrontright',$data);
        if($this->db->affected_rows()){
            return true;
        }else{
            return false;
        }
    }

    public function save_attendance($array)
    {
        foreach ($array as $values){
            $data_update = array(
                'card_id' => $values['card_id'],
                'particulars' => $values['particulars'],
                'Jun' => $values['Jun'],
                'Jul' => $values['Jul'],
                'Aug' => $values['Aug'],
                'Sep' => $values['Sep'],
                'Oct' => $values['Oct'],
                'Nov' => $values['Nov'],
                'Dec' => $values['Dec'],
                'Jan' => $values['Jan'],
                'Feb' => $values['Feb'],
                'Mar' => $values['Mar'],
                'Total' => $values['Total'],
                'history_id' => $values['history_id'],
            );
            $this->db->where('card_id', $values['card_id']);
            $this->db->update('tblstudentattendance', $data_update);
        }
        return true;
    }
    public function save_student($data, $details){
        $sess = $this->session->userdata('logged_in');
        if($data['lrn']){
            $exists = $this->db->select('*')->from('tblstudent')->where('lrn', $data['lrn'])->get();
            if($exists->result()){
                return array('exist' => true);
            }
        }
        if($data['student_id'] != " "):
            $this->db->where('student_id', $data['student_id']);
            $this->db->update('tblstudent', $data);
            return $this->db->affected_rows() ? true : false;
        else:
            $this->db->insert('tblstudent', $data);
            if($this->db->affected_rows()):
                $id = $this->db->insert_id();
                $data1 = array('student_id' => $id, 'teacher_id' => $sess['id'], 'status' => 'ACTIVE');
                $this->db->insert('tblteacherxstudent', $data1);
                $data2 = array(
                    'student_id' => $id, 
                    'teacher_name' => $sess['fullname'], 
                    'section_name' => $sess['section'], 
                    'level_name' => $sess['grade'], 
                    'age' => $details['age'],
                    'sex' => $data['sex'], 
                    'school_year' => $details['school_year'],
                    'school_name' => $details['school_name'],
                    'principal' => $details['principal'],
                    'status' => 'ACTIVE', 
                    'grade' => $sess['grade_id'], 
                );
                $this->db->insert('tblstudenthistory', $data2);
                $history_id = $this->db->insert_id();
                $this->db->select('c.*');
                $this->db->from('tblgradexsubject a, tbllogin b, tblsubjects c');
                $this->db->where('a.grade_id = b.grade_id');
                $this->db->where('a.subject_id = c.subject_id');
                $this->db->where('b.login_id', $sess['id']);
                $query = $this->db->get();
                if($query->result()){
                    $data3 = array('history_id' => $history_id);
                    foreach($query->result() as $record){
                        $data3['subject_name'] = $record->subject_name;
                        $this->db->insert('tblstudentcardfrontleft', $data3);
                    }
                }
                $data4 = array('history_id' => $history_id);
                $this->db->insert('tblstudentcardfrontright', $data4);
                $data5 = array('history_id' => $history_id, 'particulars' => 'No. of School days');
                $this->db->insert('tblstudentattendance', $data5);
                $data6 = array('history_id' => $history_id, 'particulars' => 'No. of days present');
                $this->db->insert('tblstudentattendance', $data6);
                $data7 = array('history_id' => $history_id, 'particulars' => 'No. of days absent');
                $this->db->insert('tblstudentattendance', $data7);
                return array('id' => $id, 'history' => $history_id, 'exist' => false);
            else:
                return false;
            endif;
        endif;
    }

    public function export_student($data, $details){
        $sess = $this->session->userdata('logged_in');
        $details['status'] = 'ACTIVE';
        $details['teacher_name'] = $sess['fullname'];
        $details['section_name'] = $sess['section'];
        $details['level_name'] = $sess['grade'];
        $details['sex'] = $data['sex'];
        $moral = $this->db->select('*')->from('tblstudentcardfrontright')->where('history_id', $details['history_id'])->get();
        if(!$moral->result()):
            $data4 = array('history_id' => $details['history_id']);
            $this->db->insert('tblstudentcardfrontright', $data4);
        endif;
        $grades = $this->db->select('*')->from('tblstudentcardfrontleft')->where('history_id', $details['history_id'])->get();
        if(!$grades->result()):
            $this->db->select('c.*');
            $this->db->from('tblgradexsubject a, tbllogin b, tblsubjects c');
            $this->db->where('a.grade_id = b.grade_id');
            $this->db->where('a.subject_id = c.subject_id');
            $this->db->where('b.login_id', $sess['id']);
            $query = $this->db->get();
            if($query->result()){
                $data3 = array('history_id' => $details['history_id']);
                foreach($query->result() as $record){
                    $data3['subject_name'] = $record->subject_name;
                    $this->db->insert('tblstudentcardfrontleft', $data3);
                }
            }
        endif;
        $attendance = $this->db->select('*')->from('tblstudentattendance')->where('history_id', $details['history_id'])->get();
        if(!$attendance->result()):
            $data5 = array('history_id' => $details['history_id'], 'particulars' => 'No. of School days');
            $this->db->insert('tblstudentattendance', $data5);
            $data6 = array('history_id' => $details['history_id'], 'particulars' => 'No. of days present');
            $this->db->insert('tblstudentattendance', $data6);
            $data7 = array('history_id' => $details['history_id'], 'particulars' => 'No. of days absent');
            $this->db->insert('tblstudentattendance', $data7);
        endif;
        $this->db->where('history_id', $details['history_id'])->update('tblstudenthistory', $details);
        $this->db->where('student_id', $data['student_id'])->update('tblstudent', $data);
        $this->db->where('student_id',$data['student_id'])->update('tblteacherxstudent', array('status' => 'PREVIOUS'));
        $data1 = array('teacher_id' => $sess['id'], 'student_id' => $data['student_id'], 'status' => 'ACTIVE');
        $this->db->insert('tblteacherxstudent', $data1);
        return $this->db->affected_rows() ? true : false;
    }

    public function student_next_lvl($ids){
        $sess = $this->session->userdata('logged_in');
        $order = $sess['grade_id'] + 1;
        $grade_previous = $this->db->select('*')->from('tblgrade')->where('grade_id', $sess['grade_id'])->get();
        if($grade_previous->result()){
            foreach($grade_previous->result() as $record){
                $order = $record->ordering + 1;
            }
        }
        $this->db->where_in('student_id', $ids)->update('tblstudenthistory', array('status'=> 'PREVIOUS'));
        $this->db->where_in('student_id', $ids)->update('tblteacherxstudent', array('status'=> 'PREVIOUS'));
        $query = $this->db->select('*')->from('tblgrade')->where('ordering', $order)->get();
        if($query->result()){
            foreach($query->result() as $record){
                $grade_id = $record->grade_id;
                break;
            }
            $data = array(
                'status' => 'READY',
                'grade' => $grade_id
            );
            $query1 = $this->db->select('*')->from('tblstudent')->where_in('student_id', $ids)->get();
            if($query1->result()){
                foreach($query1->result() as $record):
                    $data['student_id'] = $record->student_id;
                    $this->db->insert('tblstudenthistory', $data);
                    break;
                endforeach;
                return true;
            }else{
                return false;
            }
        }
        return true;
    }

    public function delete_student($id){
        $query = $this->db->select('*')->from('tblstudenthistory')->where('student_id', $id)->where('status', 'ACTIVE')->get();
        if($query->result()){
            foreach($query->result() as $record){
                $this->db->where('history_id', $record->history_id)->delete('tblstudentcardfrontleft');
                $this->db->where('history_id', $record->history_id)->delete('tblstudentcardfrontright');
                $this->db->where('history_id', $record->history_id)->delete('tblstudentattendance');
                $this->db->where('history_id', $record->history_id)->delete('tblstudenthistory');
            }
        }
        $this->db->where('student_id', $id)->delete('tblteacherxstudent');
        if($this->db->affected_rows()):
            return true;
        else: 
            return false;
        endif;
    }
}