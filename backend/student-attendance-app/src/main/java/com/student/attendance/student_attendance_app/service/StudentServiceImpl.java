package com.student.attendance.student_attendance_app.service;

import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.mapper.StudentMapper;
import com.student.attendance.student_attendance_app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentMapper studentMapper;

    @Autowired
    StudentRepository studentRepository;

    @Override
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(studentMapper::toDTO).toList();
    }
}
