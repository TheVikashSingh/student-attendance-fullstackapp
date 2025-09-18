package com.student.attendance.student_attendance_app.repository;


import com.student.attendance.student_attendance_app.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
