package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping(path = "/{id}")
    public Optional<Student> getSpecificStudent(@PathVariable int id){
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@Valid @RequestBody Student currStudent){
        studentService.createStudent(currStudent);
        return currStudent;
    }
    @PutMapping(path = "/{id}")
    public Optional<Student> updateSpecificStudent(@PathVariable int id,@RequestBody Student student){
        return studentService.updateStudent(id,student);
    }

    @DeleteMapping(path = "/{id}")
    public Optional<Student> deleteSpecificStudent(@PathVariable int id){
        return studentService.deleteStudent(id);
    }
}
