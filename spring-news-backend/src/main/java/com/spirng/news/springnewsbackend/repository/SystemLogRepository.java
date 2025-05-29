package com.spirng.news.springnewsbackend.repository;

import com.spirng.news.springnewsbackend.model.SystemLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
}
