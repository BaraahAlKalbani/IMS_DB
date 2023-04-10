package com.IMS.IMS_app.Service;

import com.IMS.IMS_app.Model.Student;
import com.IMS.IMS_app.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

    public Student createStudent(Student student) {
        if (student == null) {
            throw new IllegalArgumentException("Student object cannot be null");
        }
        return studentRepository.save(student);
    }

    public Optional<Student> deleteStudent(int id) {
        Optional<Student> student = getStudentById(id);
        studentRepository.deleteById(id);
        return student;
    }

    public Optional<Student> updateStudent(int id, Student updatedStudent) {
        Optional<Student> foundStudent = getStudentById(id);
        foundStudent.ifPresent(
                (currStudent) -> {
                    currStudent.setName(updatedStudent.getName());
                    currStudent.setEmail(updatedStudent.getEmail());
                    currStudent.setAge(updatedStudent.getAge());
                    studentRepository.save(currStudent);
                }
        );
        return foundStudent;
    }
}
