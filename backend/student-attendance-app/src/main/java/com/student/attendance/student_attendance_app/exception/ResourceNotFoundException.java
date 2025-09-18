package com.student.attendance.student_attendance_app.exception;


import org.springframework.stereotype.Component;

@Component
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(){
        super("An exception occurred!");
    }

}
