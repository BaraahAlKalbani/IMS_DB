package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Course;
import com.IMS.IMS_app.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CourseController {
    @Autowired
    CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping(path = "/{id}")
    public Optional<Course> getSpecificCourse(@PathVariable int id){
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course){
        return courseService.createCourse(course);
    }

    @PutMapping(path = "/{id}")
    public Optional<Course> updateCourse(@PathVariable int id,@RequestBody Course course){
        return courseService.updateCourse(id,course);
    }

    @DeleteMapping(path = "/{id}")
    public Optional<Course> deleteCourse(@PathVariable int id){
        return courseService.deleteCourse(id);
    }


}
