package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.dto.LoginRequest;
import com.spirng.news.springnewsbackend.dto.RegisterRequest;
import com.spirng.news.springnewsbackend.dto.UserResponse;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserContoller {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest user) {
        return userService.register(user);
    }

    /*@PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest user) {
        return userService.login(user);
    }*/

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest user, HttpServletResponse response) {
        UserResponse userResponse = userService.login(user);

        if (userResponse != null && userResponse.getId() != null) {
            ResponseCookie cookie = ResponseCookie.from("userId", userResponse.getId().toString())
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear the userId cookie
        ResponseCookie cookie = ResponseCookie.from("userId", "")
                .httpOnly(true)
                .secure(false) // Set to true in production with HTTPS
                .path("/")
                .maxAge(Duration.ofSeconds(0)) // Expire immediately
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(HttpServletRequest request) {
        // Get user ID from cookie
        Long userId = getUserIdFromCookie(request);

        if (userId == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        UserResponse userResponse = userService.findUserById(userId);
        return ResponseEntity.ok(userResponse);
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

    @GetMapping("/non-admins")
    public ResponseEntity<List<UserResponse>> getNonAdminUsers() {
        List<UserResponse> users = userService.findNonAdminUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/is-admin/{id}")
    public ResponseEntity<Boolean> checkIfUserIsAdmin(@PathVariable Long id) {
        boolean isAdmin = userService.isUserAdmin(id);
        return ResponseEntity.ok(isAdmin);
    }


    private Long getUserIdFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userId".equals(cookie.getName())) {
                    try {
                        return Long.parseLong(cookie.getValue());
                    } catch (NumberFormatException e) {
                        return null;
                    }
                }
            }
        }
        return null;
    }


}
