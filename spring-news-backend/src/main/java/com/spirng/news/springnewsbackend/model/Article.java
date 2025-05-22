package com.spirng.news.springnewsbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spirng.news.springnewsbackend.enums.ArticleStatus;
import com.spirng.news.springnewsbackend.enums.Theme;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ---- Core Content ----
    @Column(nullable = false)
    private String title;

    private String resume;

    private Theme theme;

    private String image;  // URL or path to image

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "article_tags",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )

    private Set<Tag> tags = new HashSet<>();  // Fixed: Use HashSet<>() instead of ArrayList<String>()

    // ---- Author (Many Articles per User) ----
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    // ---- Metadata ----
    private LocalDateTime publicationDate;

    private int views = 0;

    private String link;  // URL slug or shareable link

    @Enumerated(EnumType.STRING)
    private ArticleStatus status = ArticleStatus.PENDING;

    // ---- Comments (One Article has Many Comments) ----
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public Article() {
    }

    public Article(String title, String resume, Theme theme, String image, String content, Set<Tag> tags, User author, int views, String link, ArticleStatus status, List<Comment> comments) {
        this.title = title;
        this.resume = resume;
        this.theme = theme;
        this.image = image;
        this.content = content;
        this.tags = tags;
        this.author = author;
        this.views = views;
        this.link = link;
        this.status = status;
        this.comments = comments;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public ArticleStatus getStatus() {
        return status;
    }

    public void setStatus(ArticleStatus status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    @PrePersist
    protected void onCreate() {
        this.publicationDate = LocalDateTime.now();
    }

    public LocalDateTime getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDateTime publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}