package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.enums.ArticleStatus;
import com.spirng.news.springnewsbackend.model.Article;
import com.spirng.news.springnewsbackend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;  // ton repository Article

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getArticlesByStatus(ArticleStatus status) {
        return articleRepository.findByStatus(status);
    }

    public List<Article> getPublishedArticles() {
        return articleRepository.findByStatus(ArticleStatus.PUBLISHED);
    }

    public Article updateArticleStatus(Long articleId, ArticleStatus newStatus) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + articleId));

        article.setStatus(newStatus);
        return articleRepository.save(article);
    }

    public List<Article> getArticlesByAuthorId(Long authorId) {
        return articleRepository.findByAuthorId(authorId);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

}
