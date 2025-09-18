package com.student.attendance.student_attendance_app.dto;

import org.springframework.stereotype.Component;

public class StudentDTO {

    private Long id;

    private String studentname;

    private String studentgender;

    private String date;

    private Boolean ispresent;

    public StudentDTO() {
    }

    public StudentDTO(Long id, String studentname, String studentgender, String date, Boolean ispresent) {
        this.id = id;
        this.studentname = studentname;
        this.studentgender = studentgender;
        this.date = date;
        this.ispresent = ispresent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public String getStudentgender() {
        return studentgender;
    }

    public void setStudentgender(String studentgender) {
        this.studentgender = studentgender;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getIspresent() {
        return ispresent;
    }

    public void setIspresent(Boolean ispresent) {
        this.ispresent = ispresent;
    }
}
