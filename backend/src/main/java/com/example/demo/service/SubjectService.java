package com.example.demo.service;

import com.example.demo.entity.Subject;
import com.example.demo.repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepo repo;

    public List<Subject> getAllSubjects() {
        return repo.findAll();
    }

    public List<Subject> getSubjectsByCourse(Long courseId) {
        return repo.findByCourseId(courseId);
    }

    public Subject saveSubject(Subject subject) {
        return repo.save(subject);
    }

    public void deleteSubject(Long id) {
        repo.deleteById(id);
    }
}
