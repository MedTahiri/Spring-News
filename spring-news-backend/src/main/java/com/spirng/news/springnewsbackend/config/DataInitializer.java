package com.spirng.news.springnewsbackend.config;


import com.spirng.news.springnewsbackend.dto.RegisterRequest;
import com.spirng.news.springnewsbackend.enums.Role;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class DataInitializer implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User admin = userService.findUserByEmail("admin@gmail.com");

        if (admin == null) {
            RegisterRequest user = new RegisterRequest(
                    "admin@gmail.com",
                    "admin123",
                    "mohamed",
                    "tahiri",
                    Role.Admin,
                    "Admin"
            );
            userService.register(user);
            System.out.println("✅ Default admin created.");
        } else {
            System.out.println("ℹ️ Admin already exists.");
        }

    }
}