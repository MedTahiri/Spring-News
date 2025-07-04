package com.spirng.news.springnewsbackend.repository;

import com.spirng.news.springnewsbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailAndPassword(String email, String password);

    boolean findByEmail(String email);

    User getUserByEmailAndPassword(String email, String password);

    User getUserByEmail(String email);
}
