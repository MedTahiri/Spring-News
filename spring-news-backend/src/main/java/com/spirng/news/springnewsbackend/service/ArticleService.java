package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.enums.ArticleStatus;
import com.spirng.news.springnewsbackend.model.Article;
import com.spirng.news.springnewsbackend.repository.ArticleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.Long;
import java.time.LocalDateTime;
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
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));

        article.setViews(article.getViews() + 1);
        return articleRepository.save(article);
    }

    @Transactional
    public void updateNullPublicationDates() {
        List<Article> articlesWithNullDates = articleRepository.findByPublicationDateIsNull();
        for (Article article : articlesWithNullDates) {
            article.setPublicationDate(LocalDateTime.now());
            articleRepository.save(article);
        }
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
