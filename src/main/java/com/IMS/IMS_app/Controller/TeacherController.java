package com.IMS.IMS_app.Controller;

import com.IMS.IMS_app.Model.Teacher;
import com.IMS.IMS_app.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @GetMapping
    public List<Teacher> getAllTeachers(){
        return teacherService.getAllTeachers();
    }

    @GetMapping(path = "/{id}")
    public Optional<Teacher> getSpecificTeacher(@PathVariable int id){
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public Teacher hireTeacher(@Valid @RequestBody Teacher teacher){
        return teacherService.hireTeacher(teacher);
    }

    @PutMapping(path = "/{id}")
    public Optional<Teacher> upDateSpecificTeacher(@PathVariable int id,@RequestBody Teacher teacher){
        return teacherService.updateTeacher(id,teacher);
    }

    @DeleteMapping(path = "/{id}")
    public Optional<Teacher> deleteSpecificTeacher(@PathVariable int id){
        return teacherService.fireTeacher(id);
    }
}
