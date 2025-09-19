package com.student.attendance.student_attendance_app.service;

import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;


public interface StudentService {

    List<StudentDTO> getAllStudents();

    StudentDTO getStudentByID(Long id);

    StudentDTO createStudent(StudentDTO studentDTO);

    void deleteStudentByID(Long id);

    StudentDTO updateStudent(Long id,StudentDTO studentDTO);

}
