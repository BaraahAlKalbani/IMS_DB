package com.IMS.IMS_app.Model;

import jakarta.persistence.*;

import javax.validation.constraints.Pattern;

@Entity
@Table(name = "teacher_ims")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private int teacherId;
    @Column
    private String name;
    @Column
    @Pattern(regexp="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", message="Invalid email")
    private String email;
    @Column
    private Double salary;
    @Column
    private long hireAt;
    @OneToOne(mappedBy = "assignedTeacher")
    private Course course;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public long getHireAt() {
        return hireAt;
    }

    public void setHireAt(long hireAt) {
        this.hireAt = hireAt;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
