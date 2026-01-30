package com.example.demo.service;

import com.example.demo.entity.Course;
import com.example.demo.repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepo repo;

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public Course saveCourse(Course course) {
        return repo.save(course);
    }

    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }
}
