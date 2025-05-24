package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.model.Article;
import com.spirng.news.springnewsbackend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;  // ton repository Article

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

}
