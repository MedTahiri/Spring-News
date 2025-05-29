package com.spirng.news.springnewsbackend.dto;

import com.spirng.news.springnewsbackend.model.Comment;

import java.time.LocalDateTime;


public class CommentResponse {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private UserResponse user;
    private Long articleId;

    public CommentResponse() {}

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.articleId = comment.getArticle().getId();

        if (comment.getUser() != null) {
            this.user = new UserResponse(comment.getUser());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }
}