package com.student.attendance.student_attendance_app.service;

import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.exception.ResourceNotFoundException;
import com.student.attendance.student_attendance_app.mapper.StudentMapper;
import com.student.attendance.student_attendance_app.model.Student;
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

    @Override
    public StudentDTO getStudentByID(Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Student Not Found with id: " + id));
        return studentMapper.toDTO(student);
    }

    @Override
    public StudentDTO createStudent(StudentDTO studentDTO) {
        return studentMapper.toDTO(studentRepository.save(studentMapper.toEntity(studentDTO)));
    }

    @Override
    public void deleteStudentByID(Long id) {
        if(!studentRepository.existsById(id)){
            throw new ResourceNotFoundException("Student Does not exist");
        }
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDTO updateStudent(Long id,StudentDTO studentDTO) {
        Student student = studentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Student non existent with id: "+id));
        student.setStudentname(studentDTO.getStudentname());
        student.setDate(studentDTO.getDate());
        student.setStudentgender(studentDTO.getStudentgender());
        student.setIspresent(studentDTO.getIspresent());
        return studentMapper.toDTO(studentRepository.save(student));
    }


}
