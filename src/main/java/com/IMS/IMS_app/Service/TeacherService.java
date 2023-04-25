package com.IMS.IMS_app.Service;

import com.IMS.IMS_app.Model.Teacher;
import com.IMS.IMS_app.Repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    public Optional<Teacher> getTeacherById(int id) {
      return teacherRepository.findById(id);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Teacher hireTeacher(Teacher teacher) {
        if (teacher == null || teacher.getName() == null || teacher.getEmail() == null || teacher.getSalary() == null) {
            throw new IllegalArgumentException("Teacher object or its fields cannot be null");
        }
        return teacherRepository.save(teacher);
    }


    public Optional<Teacher> fireTeacher(int id) {
        Optional<Teacher> teacher = getTeacherById(id);
        teacherRepository.deleteById(id);
        return teacher;
    }

    public Optional<Teacher> updateTeacher(int id, Teacher updatedTeacher) {
        Optional<Teacher> foundTeacher = getTeacherById(id);
        foundTeacher.ifPresent(
                (currTeacher)-> {
                    currTeacher.setName(updatedTeacher.getName());
                    currTeacher.setEmail(updatedTeacher.getEmail());
                    currTeacher.setSalary(updatedTeacher.getSalary());
                    teacherRepository.save(currTeacher);
                }
        );
        return foundTeacher;
    }

}
