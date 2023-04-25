package com.IMS.IMS_app.Service;

import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Optional<Student> getStudentById(int id) {
        return studentRepository.findById(id);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student createStudent(Student student, Boolean image) {
        if (student == null) {
            throw new IllegalArgumentException("Student object cannot be null");
        }
        if (image) {
            student = studentRepository.save(student);
            student.setImageName(student.getStudentId() + "_" + student.getName() + ".jpg");
        }

        return studentRepository.save(student);
    }


    public Optional<Student> deleteStudent(int id) {
        Optional<Student> student = getStudentById(id);
        studentRepository.deleteById(id);
        return student;
    }

    public Optional<Student> updateStudent(int id, Student updatedStudent, Boolean image) {
        Optional<Student> foundStudent = getStudentById(id);
        foundStudent.ifPresent(
                (currStudent) -> {
                    if (!updatedStudent.getName().isEmpty()) {
                        currStudent.setName(updatedStudent.getName());
                    }
                    if (!updatedStudent.getEmail().isEmpty()) {
                        currStudent.setEmail(updatedStudent.getEmail());
                    }
                    if (updatedStudent.getAge()!=0) {
                        currStudent.setAge(updatedStudent.getAge());
                    }
                    if (image) {
                        String filePath = "./src/main/resources/static/data/students_images/" + currStudent.getImageName();
                        File file = new File(filePath);
                        if (file.exists()) {
                            if (file.delete()) {
                                System.out.println("File deleted successfully.");
                            }
                            currStudent.setImageName(updatedStudent.getStudentId() + "_" + updatedStudent.getName() + ".jpg");
                        }
                    }
                    studentRepository.save(currStudent);
                }
        );
        return foundStudent;
    }

    public String getStudentImage(int id) {
        Optional<Student> student = getStudentById(id);
        return student.map(Student::getImageName).orElse(null);
    }

}
