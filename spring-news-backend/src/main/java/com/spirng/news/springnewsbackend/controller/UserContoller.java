package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.dto.LoginRequest;
import com.spirng.news.springnewsbackend.dto.RegisterRequest;
import com.spirng.news.springnewsbackend.dto.UserResponse;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserContoller {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Add new user to the database")
    @ApiResponse(responseCode = "200", description = "Successfully added new user")
    public UserResponse register(@RequestBody RegisterRequest user) {
        return userService.register(user);
    }

    /*@PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest user) {
        return userService.login(user);
    }*/

    @PostMapping("/login")
    @Operation(summary = "Login to user account", description = "Enter to the user account with valid credentials")
    @ApiResponse(responseCode = "200", description = "Successfully added new user")
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
    @Operation(
            summary = "Logout from user account",
            description = "Logs out the current user and invalidates the session"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully logged out"),
            @ApiResponse(responseCode = "401", description = "User not authenticated", content = @Content)
    })
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
    @Operation(
            summary = "Get current logged-in user",
            description = "Fetches the details of the currently authenticated user based on the user ID stored in the cookie"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user information"),
            @ApiResponse(responseCode = "401", description = "User not authenticated or session expired", content = @Content)
    })
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
    @Operation(
            summary = "Delete user by ID",
            description = "Deletes the user with the specified ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User successfully deleted"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/find/{id}")
    @Operation(
            summary = "Find user by ID",
            description = "Retrieves the user details corresponding to the specified ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User found successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.findUserById(id);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all users", description = "Retrieve a list of all users in the system")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/non-admins")
    @Operation(
            summary = "Get all non-admin users",
            description = "Retrieves a list of all users who do not have admin privileges"
    )
    @ApiResponses(@ApiResponse(responseCode = "200", description = "Successfully retrieved list of non-admin users"))
    public ResponseEntity<List<UserResponse>> getNonAdminUsers() {
        List<UserResponse> users = userService.findNonAdminUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/is-admin/{id}")
    @Operation(
            summary = "Check if user is admin",
            description = "Returns whether the user with the specified ID has admin privileges"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully checked admin status"),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
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
