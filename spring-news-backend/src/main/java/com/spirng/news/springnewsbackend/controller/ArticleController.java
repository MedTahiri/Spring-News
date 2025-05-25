package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.dto.ArticleRequest;
import com.spirng.news.springnewsbackend.dto.ArticleResponse;
import com.spirng.news.springnewsbackend.enums.ArticleStatus;
import com.spirng.news.springnewsbackend.enums.Theme;
import com.spirng.news.springnewsbackend.model.Article;
import com.spirng.news.springnewsbackend.model.Tag;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.ArticleService;
import com.spirng.news.springnewsbackend.service.TagService;
import com.spirng.news.springnewsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserService userService;

    @Autowired
    private TagService tagService;

    @PostMapping("/new")
    public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleRequest request) {
        User author = userService.findUserEntityById(request.getAuthorId());

        Set<Tag> tags = new HashSet<>();
        if (request.getTags() != null) {
            for (String tagName : request.getTags()) {
                // Find existing tag or create new one
                Tag tag = tagService.findOrCreateByName(tagName);
                tags.add(tag);
            }
        }

        Article article = new Article(
                request.getTitle(),
                request.getResume(),
                Theme.valueOf(request.getTheme()),
                request.getImage(),
                request.getContent(),
                tags, // Now passing Set<Tag> instead of List<String>
                author,
                0,
                request.getLink(),
                ArticleStatus.PENDING,
                new ArrayList<>()
        );

        Article savedArticle = articleService.saveArticle(article);

        ArticleResponse response = new ArticleResponse(savedArticle);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArticleResponse>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        List<ArticleResponse> responses = new ArrayList<>();

        for (Article article : articles) {
            responses.add(new ArticleResponse(article));
        }

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ArticleResponse>> getPendingArticles() {
        List<Article> pendingArticles = articleService.getArticlesByStatus(ArticleStatus.PENDING);
        List<ArticleResponse> responses = new ArrayList<>();
        for (Article article : pendingArticles) {
            responses.add(new ArticleResponse(article));
        }
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/published")
    public ResponseEntity<List<ArticleResponse>> getPublishedArticles() {
        List<Article> publishedArticles = articleService.getArticlesByStatus(ArticleStatus.PUBLISHED);
        List<ArticleResponse> responses = new ArrayList<>();
        for (Article article : publishedArticles) {
            responses.add(new ArticleResponse(article));
        }
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ArticleResponse> publishArticle(@PathVariable Long id) {
        Article updatedArticle = articleService.updateArticleStatus(id, ArticleStatus.PUBLISHED);
        ArticleResponse response = new ArticleResponse(updatedArticle);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{id}/refuse")
    public ResponseEntity<ArticleResponse> refuseArticle(@PathVariable Long id) {
        Article updatedArticle = articleService.updateArticleStatus(id, ArticleStatus.REFUSED);
        ArticleResponse response = new ArticleResponse(updatedArticle);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<ArticleResponse>> getArticlesByAuthor(@PathVariable Long authorId) {
        List<Article> articles = articleService.getArticlesByAuthorId(authorId);
        List<ArticleResponse> responses = new ArrayList<>();
        for (Article article : articles) {
            responses.add(new ArticleResponse(article));
        }
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticleById(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        ArticleResponse response = new ArticleResponse(article);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}