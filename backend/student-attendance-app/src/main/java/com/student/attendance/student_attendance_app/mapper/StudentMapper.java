package com.student.attendance.student_attendance_app.mapper;


import com.student.attendance.student_attendance_app.dto.StudentDTO;
import com.student.attendance.student_attendance_app.model.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    Student toEntity(StudentDTO studentDTO);
    StudentDTO toDTO(Student student);

}
