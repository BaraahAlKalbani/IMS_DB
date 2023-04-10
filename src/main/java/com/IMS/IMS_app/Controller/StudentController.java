package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Service.StudentService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
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
        return studentService.createStudent(currStudent,false);
    }


    @PostMapping(path = "/withImage",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student createStudentWithImage(@RequestParam String name, @RequestParam String email, @RequestParam int age, @RequestParam(required = false) MultipartFile image) throws IOException {
        Student newStudent = new Student();
        newStudent.setAge(age);
        newStudent.setEmail(email);
        newStudent.setName(name);

        if(!image.isEmpty()) {
            newStudent = studentService.createStudent(newStudent,true);
            FileUtils.writeByteArrayToFile(new File("./data/studentsImages/" +newStudent.getImageName()), image.getBytes());
        }
        else {
            newStudent = studentService.createStudent(newStudent,false);

        }
        return newStudent;
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
