package com.IMS.IMS_app.Repository;

import com.IMS.IMS_app.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Integer>{
}
