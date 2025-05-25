package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.dto.LoginRequest;
import com.spirng.news.springnewsbackend.dto.RegisterRequest;
import com.spirng.news.springnewsbackend.dto.UserResponse;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spirng.news.springnewsbackend.enums.Role;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse register(RegisterRequest user) {
        User newUser = new User(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getRole(), user.getBio());
//        if (userRepository.findByEmail(user.getEmail())){
//            throw new IllegalArgumentException("Email is exist");
//        }
        User user1 = userRepository.save(newUser);
        return new UserResponse(user1.getId(), user1.getEmail(), user1.getFirstName(), user1.getLastName(), user1.getRole(), user1.getCreatedAt(), user1.getBio());
    }

    public UserResponse login(LoginRequest user) {
        User user1 = userRepository.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        return new UserResponse(user1.getId(), user1.getEmail(), user1.getFirstName(), user1.getLastName(), user1.getRole(), user1.getCreatedAt(), user1.getBio());

    }

    public void deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist.");
        }
        userRepository.deleteById(id);
    }

    public UserResponse findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));
        return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(),
                user.getRole(), user.getCreatedAt(), user.getBio());
    }

    public User findUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public List<UserResponse> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserResponse(user.getId(), user.getEmail(), user.getFirstName(),
                        user.getLastName(), user.getRole(), user.getCreatedAt(), user.getBio()))
                .collect(Collectors.toList());
    }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getCreatedAt(),
                user.getBio()
        );
    }


    public List<UserResponse> findNonAdminUsers() {
        List<User> users = userRepository.findAll();

        List<User> nonAdmins = users.stream()
                .filter(user -> user.getRole() == Role.Client || user.getRole() == Role.Journalist)
                .toList();

        return nonAdmins.stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    public boolean isUserAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        return user.getRole() == Role.Admin;
    }

}
