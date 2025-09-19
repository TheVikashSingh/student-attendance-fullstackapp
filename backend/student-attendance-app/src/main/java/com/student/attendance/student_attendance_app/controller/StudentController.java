package com.student.attendance.student_attendance_app.controller;

import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public StudentDTO getStudentWithID(@PathVariable Long id){
        return studentService.getStudentByID(id);
    }

    @PostMapping
    public StudentDTO createStudent(@RequestBody StudentDTO studentDTO){
        return studentService.createStudent(studentDTO);
    }

    @PutMapping("/{id}")
    public StudentDTO updateStudent(@RequestBody StudentDTO studentDTO, @PathVariable Long id){
        return studentService.updateStudent(id,studentDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id){
        studentService.deleteStudentByID(id);
        return "Student with id: " + id + " has its record deleted.";
    }



}
