package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalClasses;
    private int absentClasses;
    private int presentClasses;
    private double percentage;
    private boolean eligible;
    private String date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Attendance() {}

    public Attendance(int totalClasses, int absentClasses, User user) {
        this.totalClasses = totalClasses;
        this.absentClasses = absentClasses;
        this.user = user;
        this.presentClasses = totalClasses - absentClasses;
        this.percentage = (double) this.presentClasses / totalClasses * 100;
        this.eligible = this.percentage >= 75;
        this.date = LocalDateTime.now().toString();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getTotalClasses() { return totalClasses; }
    public void setTotalClasses(int totalClasses) { this.totalClasses = totalClasses; }
    public int getAbsentClasses() { return absentClasses; }
    public void setAbsentClasses(int absentClasses) { this.absentClasses = absentClasses; }
    public int getPresentClasses() { return presentClasses; }
    public void setPresentClasses(int presentClasses) { this.presentClasses = presentClasses; }
    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }
    public boolean isEligible() { return eligible; }
    public void setEligible(boolean eligible) { this.eligible = eligible; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
