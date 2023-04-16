package com.IMS.IMS_app.Model;

import java.util.List;

public class CourseEnrollment {
    private int courseId;
    private List<Integer> studentIds;

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public List<Integer> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(List<Integer> studentIds) {
        this.studentIds = studentIds;
    }
}
