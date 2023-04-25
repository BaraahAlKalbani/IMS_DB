package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Service.StudentService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*", allowedHeaders = {"*", "Authorization", "Content-Type"})
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
    public Student createStudentWithImage(@RequestParam String name,@Valid @RequestParam String email, @RequestParam int age, @RequestParam(required = false) MultipartFile image) throws IOException {
        Student newStudent = new Student();
        newStudent.setAge(age);
        newStudent.setEmail(email);
        newStudent.setName(name);

        if(!image.isEmpty()) {
            newStudent = studentService.createStudent(newStudent,true);
            FileUtils.writeByteArrayToFile(new File("./src/main/resources/static/data/students_images/" +newStudent.getImageName()), image.getBytes());
        }
        else {
            newStudent = studentService.createStudent(newStudent,false);
        }
        return newStudent;
    }

    @GetMapping("/getImage/{id}")
    public ResponseEntity<Resource> getImageById(@PathVariable("id") int id) throws IOException {
        // Retrieve the student by ID from the database or any other source
        Optional<Student> student = studentService.getStudentById(id);

        if (student.isEmpty()) {
            // Handle case when student not found
            return ResponseEntity.notFound().build();
        }
        System.out.println(studentService.getStudentImage(id));
        String imagePath = "./src/main/resources/static/data/students_images/" + studentService.getStudentImage(id);
        File imageFile = new File(imagePath);

        if (imageFile.exists()) {
            // Create a Resource object to represent the image file
            Resource imageResource = new UrlResource(imageFile.toURI());

            // Return the image file as a ResponseEntity with appropriate headers
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Set the appropriate content type for the image
                    .contentLength(imageResource.contentLength()) // Set the content length of the image
                    .body(imageResource);
        } else {
            // Handle case when image file not found
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Optional<Student> updateSpecificStudent(@PathVariable int id, @RequestParam String name,
                                                   @Valid @RequestParam String email, @RequestParam int age,
                                                   @RequestParam(required = false) MultipartFile image) throws IOException {
        Student student = new Student();
        student.setAge(age);
        student.setEmail(email);
        student.setName(name);
        if (image != null && !image.isEmpty()) {
            Optional<Student> updatedStudent = studentService.updateStudent(id, student, true);
            student = updatedStudent.orElse(student);
            FileUtils.writeByteArrayToFile(
                    new File("./src/main/resources/static/data/students_images/" + student.getImageName()),
                    image.getBytes());
            return updatedStudent;
        } else {
            return studentService.updateStudent(id, student, false);
        }
    }



    @DeleteMapping(path = "/{id}")
    public Optional<Student> deleteSpecificStudent(@PathVariable int id){
        return studentService.deleteStudent(id);
    }
}
