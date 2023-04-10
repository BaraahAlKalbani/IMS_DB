package com.IMS.IMS_app.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "course_ims")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private int courseId;

    @Column
    private String name;

    @Column
    private String description;

    @OneToOne
    @JoinColumn(name = "assigned_Teacher_id",referencedColumnName = "teacher_id")
    @JsonIgnore
    private Teacher assignedTeacher;

    @JsonProperty("teacher_id")
    public Integer getTeacherID(){
        return assignedTeacher != null ? assignedTeacher.getTeacherId():null;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public Teacher getAssignedTeacher() {
        return assignedTeacher;
    }

    public void setAssignedTeacher(Teacher assignedTeacher) {
        this.assignedTeacher = assignedTeacher;
    }
}