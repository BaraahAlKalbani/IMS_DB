package com.IMS.IMS_app.Service;

import com.IMS.IMS_app.Model.Course;
import com.IMS.IMS_app.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherService teacherService;

    public Optional<Course> getCourseById(int id) {
        return courseRepository.findById(id);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course createCourse(Course course) {
        if (course == null) {
            throw new IllegalArgumentException("Course object cannot be null");
        }
        return courseRepository.save(course);
    }

    public Optional<Course> deleteCourse(int id) {
        Optional<Course> course = getCourseById(id);
        courseRepository.deleteById(id);
        return course;
    }

    public Optional<Course> updateCourse(int id, Course updatedCourse) {
        Optional<Course> foundCourse = getCourseById(id);
        foundCourse.ifPresent(
                (currCourse) -> {
                    currCourse.setName(updatedCourse.getName());
                    currCourse.setDescription(updatedCourse.getDescription());
                    currCourse.setAssignedTeacher(updatedCourse.getAssignedTeacher());
                    courseRepository.save(currCourse);
                }
        );
        return foundCourse;
    }
}
