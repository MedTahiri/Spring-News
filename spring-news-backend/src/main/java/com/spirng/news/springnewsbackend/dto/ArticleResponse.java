package com.spirng.news.springnewsbackend.dto;

import com.spirng.news.springnewsbackend.enums.ArticleStatus;
import com.spirng.news.springnewsbackend.enums.Theme;
import com.spirng.news.springnewsbackend.model.Tag;
import com.spirng.news.springnewsbackend.model.User;

import java.time.LocalDateTime;
import java.util.Set;

public class ArticleResponse {

    private Long id;
    private String title;
    private String resume;
    private Theme theme;
    private String image;
    private String content;
    private Set<Tag> tags;
    private UserSummary author;
    private int views;
    private String link;
    private ArticleStatus status;
    private LocalDateTime createdAt;

    // Constructor that builds from Article entity
    public ArticleResponse(com.spirng.news.springnewsbackend.model.Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.resume = article.getResume();
        this.theme = article.getTheme();
        this.image = article.getImage();
        this.content = article.getContent();
        this.tags = article.getTags();
        this.author = new UserSummary(article.getAuthor());
        this.views = article.getViews();
        this.link = article.getLink();
        this.status = article.getStatus();
    }

    // Inner class to send minimal user info in author field
    public static class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String bio;

        public UserSummary(User user) {
            this.id = user.getId();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.email = user.getEmail();
            this.bio = user.getBio();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
        public String getBio() {return bio;}
        public void setBio(String bio) {this.bio = bio;}

        public UserSummary(Long id, String firstName, String lastName, String email, String bio) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.bio = bio;
        }

        public UserSummary() {
        }
    }

    public ArticleResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public UserSummary getAuthor() {
        return author;
    }

    public void setAuthor(UserSummary author) {
        this.author = author;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public ArticleStatus getStatus() {
        return status;
    }

    public void setStatus(ArticleStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
