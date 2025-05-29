package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.model.SystemLog;
import com.spirng.news.springnewsbackend.service.SystemLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class LogController {

    @Autowired
    private SystemLogService systemLogService;

    @GetMapping("/logs")
    public List<SystemLog> logs() {
        return systemLogService.findAll();
    }

    @DeleteMapping("/clean")
    public void clean() {
        systemLogService.cleanAll();
    }


}
