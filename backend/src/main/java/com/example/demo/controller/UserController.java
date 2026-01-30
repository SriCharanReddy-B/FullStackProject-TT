package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173") 
public class UserController {
    
    @Autowired
    public UserService service;

    @PostMapping("/register")
    public User SaveNewUser(@RequestBody User user) {
        return service.savingNewUser(user);
    }

    @PostMapping("/login")    
    public User AuthEmailAndPass(@RequestBody User user) {
        return service.authEmailAndPassword(user);
    }

    @GetMapping("/allusers")
    public List<User> findAllUsers() {
        return service.getAllUsers();
    }

    // --- NEW: DELETE ENDPOINT ---
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "User Deleted";
    }

    // --- NEW: UPDATE ENDPOINT ---
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return service.updateUser(id, user);
    }
}