package com.example.demo.controller;

import com.example.demo.entity.Subject;
import com.example.demo.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService service;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return service.getAllSubjects();
    }

    @GetMapping("/course/{courseId}")
    public List<Subject> getSubjectsByCourse(@PathVariable Long courseId) {
        return service.getSubjectsByCourse(courseId);
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return service.saveSubject(subject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        service.deleteSubject(id);
    }
}
