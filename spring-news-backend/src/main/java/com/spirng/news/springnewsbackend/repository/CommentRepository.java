package com.spirng.news.springnewsbackend.repository;

import com.spirng.news.springnewsbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    List<Comment> findByUserId(Long userId);
    void deleteByArticleId(Long articleId);
}