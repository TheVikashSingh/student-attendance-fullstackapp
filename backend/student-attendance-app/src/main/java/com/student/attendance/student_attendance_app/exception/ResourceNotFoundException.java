package com.student.attendance.student_attendance_app.exception;


import org.springframework.stereotype.Component;


public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message){
        super(message);
    }

}
