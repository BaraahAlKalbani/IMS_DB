package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Course;
import com.IMS.IMS_app.Model.CourseAssigner;
import com.IMS.IMS_app.Model.Teacher;
import com.IMS.IMS_app.Service.CourseService;
import com.IMS.IMS_app.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/assigner")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CourseAssignerController {
    @Autowired
    CourseService courseService;
    @Autowired
    TeacherService teacherService;
    @PostMapping
    public CourseAssigner assigneMentorToCourse(CourseAssigner assigner)
    {
        Optional<Course>optionalCourse=courseService.getCourseById(assigner.getCourse_id());
        Optional<Teacher>optionalTeacher=teacherService.getTeacherById(assigner.getTeacher_id());
        optionalCourse.ifPresent((course)->{
            optionalTeacher.ifPresent((teacher)->{
                course.setAssignedTeacher(teacher);
                courseService.createCourse(course);
            });
        });
        return assigner;
    }
}
