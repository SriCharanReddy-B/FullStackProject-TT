package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepo repo;

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public List<Student> getStudentsByCourse(Long courseId) {
        return repo.findByCourseId(courseId);
    }

    public Student saveStudent(Student student) {
        return repo.save(student);
    }

    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }
}
