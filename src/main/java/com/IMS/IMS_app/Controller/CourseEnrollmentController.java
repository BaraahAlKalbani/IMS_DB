package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Course;
import com.IMS.IMS_app.Model.CourseEnrollment;
import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Service.CourseService;
import com.IMS.IMS_app.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;
@Controller
@RequestMapping("/api/courseEnrollment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CourseEnrollmentController {
    @Autowired
    CourseService courseService;

    @Autowired
    StudentService studentService;

    @PostMapping
    public void enrollStudentInCourse(@RequestBody CourseEnrollment courseEnrollment)
    {
        Optional<Course> optionalCourse = courseService.getCourseById(courseEnrollment.getCourseId());
        optionalCourse.ifPresent((course -> {
            courseEnrollment.getStudentIds().forEach((currStudent)->{
                Optional<Student> optionalStudent = studentService.getStudentById(currStudent);
                optionalStudent.ifPresent((student -> {
                   course.getStudents().add(student);
                }));
            });

            courseService.updateCourse(course.getCourseId(),course);
        }));
    }
}
