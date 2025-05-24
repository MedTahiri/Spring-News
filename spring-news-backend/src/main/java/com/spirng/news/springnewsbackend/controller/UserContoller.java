package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.dto.LoginRequest;
import com.spirng.news.springnewsbackend.dto.RegisterRequest;
import com.spirng.news.springnewsbackend.dto.UserResponse;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserContoller {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest user) {
        return userService.login(user);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.findUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }
}
