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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserService userService;

    @Autowired
    private TagService tagService; // You'll need this service to handle tags

    @PostMapping("/new")
    public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleRequest request) {
        User author = userService.findUserEntityById(request.getAuthorId());

        // Convert List<String> to Set<Tag>
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
}