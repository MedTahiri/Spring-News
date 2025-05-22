package com.spirng.news.springnewsbackend.repository;


import com.spirng.news.springnewsbackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
