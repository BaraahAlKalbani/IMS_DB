package com.IMS.IMS_app.Repository;

import com.IMS.IMS_app.Model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer>{
}
