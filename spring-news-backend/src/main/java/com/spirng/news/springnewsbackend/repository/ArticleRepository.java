package com.spirng.news.springnewsbackend.repository;

import com.spirng.news.springnewsbackend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // JpaRepository fournit déjà findById, save, delete, etc.
}
