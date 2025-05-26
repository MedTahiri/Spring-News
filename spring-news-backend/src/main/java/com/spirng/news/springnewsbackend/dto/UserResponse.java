package com.spirng.news.springnewsbackend.dto;

import com.spirng.news.springnewsbackend.enums.Role;
import com.spirng.news.springnewsbackend.model.User;

import java.time.LocalDateTime;

public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role ;
    private LocalDateTime createdAt;
    private String bio;

    public UserResponse() {
    }

    public UserResponse(Long id, String email, String firstName, String lastName, Role role, LocalDateTime createdAt, String bio) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.createdAt = createdAt;
        this.bio = bio;
    }
    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.role = user.getRole();
        this.createdAt = user.getCreatedAt();
        this.bio = user.getBio();
    }

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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
