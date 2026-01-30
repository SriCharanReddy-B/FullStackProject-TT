package com.example.demo.service;

import com.example.demo.entity.Attendance;
import com.example.demo.entity.User;
import com.example.demo.repository.AttendanceRepo;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private UserRepo userRepo;

    public Attendance addAttendance(Long userId, int total, int absent) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Attendance attendance = new Attendance();
        attendance.setTotalClasses(total);
        attendance.setAbsentClasses(absent);
        attendance.setUser(user);
        
        // Logic duplicated from frontend constructor logic for safety
        attendance.setPresentClasses(total - absent);
        attendance.setPercentage( Double.parseDouble(String.format("%.2f", (double) (total - absent) / total * 100)) );
        attendance.setEligible(attendance.getPercentage() >= 75);
        attendance.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return attendanceRepo.save(attendance);
    }

    public List<Attendance> getAttendanceByUserId(Long userId) {
        return attendanceRepo.findByUserId(userId);
    }
}
