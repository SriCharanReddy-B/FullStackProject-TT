package com.example.demo.controller;

import com.example.demo.entity.Attendance;
import com.example.demo.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/add/{userId}")
    public Attendance addAttendance(@PathVariable Long userId, @RequestBody Map<String, Integer> payload) {
        int total = payload.get("total");
        int absent = payload.get("absent");
        return attendanceService.addAttendance(userId, total, absent);
    }

    @GetMapping("/user/{userId}")
    public List<Attendance> getUserAttendance(@PathVariable Long userId) {
        return attendanceService.getAttendanceByUserId(userId);
    }
}
