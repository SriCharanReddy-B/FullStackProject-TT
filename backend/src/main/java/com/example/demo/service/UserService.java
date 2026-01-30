package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    public UserRepo repo;

    public User savingNewUser(User user) {
        return repo.save(user);
    }

    public User authEmailAndPassword(User user) {
        User user2 = repo.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(user2 == null) {
            throw new RuntimeException("Invalid Details");
        }
        return user2;
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // --- NEW: DELETE USER ---
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    // --- NEW: UPDATE USER ---
    public User updateUser(Long id, User newData) {
        Optional<User> op = repo.findById(id);
        if (op.isPresent()) {
            User existingUser = op.get();
            existingUser.setUsername(newData.getUsername());
            existingUser.setEmail(newData.getEmail());
            existingUser.setPassword(newData.getPassword());
            return repo.save(existingUser);
        }
        return null;
    }
}