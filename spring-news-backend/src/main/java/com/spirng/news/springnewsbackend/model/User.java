package com.spirng.news.springnewsbackend.model;

import com.spirng.news.springnewsbackend.enums.Role;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // Primary key

    @Column(nullable = false, unique = true, length = 100)
    private String email;               // Contact / unique ID

    @Column(nullable = false)
    private String password;            // BCrypt-hashed password

    /* ---------- Personal info ---------- */
    private String firstName;
    private String lastName;

    /* ---------- Authorization ---------- */

    @Column(name = "role")
    private Role role ;
    // Role is an enum: CLIENT, JOURNALIST, ADMIN


    @CreationTimestamp
    private LocalDateTime createdAt;           // Auto-filled on insert

    private String bio;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public User() {
    }

    public User(String email, String password, String firstName, String lastName, Role role, String bio) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.bio = bio;
    }
}

