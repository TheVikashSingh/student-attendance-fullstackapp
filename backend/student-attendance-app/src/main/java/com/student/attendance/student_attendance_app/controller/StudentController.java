package com.student.attendance.student_attendance_app.controller;

import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class StudentController {


    @Autowired
    StudentService studentService;

    @GetMapping("/")
    public List<StudentDTO> getStudents(){
        return studentService.getAllStudents();
    }

}
