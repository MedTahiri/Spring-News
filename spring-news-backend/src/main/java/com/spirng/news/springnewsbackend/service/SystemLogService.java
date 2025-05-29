package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.model.SystemLog;
import com.spirng.news.springnewsbackend.repository.SystemLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SystemLogService {

    @Autowired
    private SystemLogRepository systemLogRepository;

    public SystemLog save(SystemLog systemLog) {
        return systemLogRepository.save(systemLog);
    }

    public List<SystemLog> findAll() {
        return systemLogRepository.findAll();
    }

    public void cleanAll() {
        systemLogRepository.deleteAll();
    }
}
