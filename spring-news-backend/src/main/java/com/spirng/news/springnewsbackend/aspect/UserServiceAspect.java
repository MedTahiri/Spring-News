package com.spirng.news.springnewsbackend.aspect;

import com.spirng.news.springnewsbackend.model.SystemLog;
import com.spirng.news.springnewsbackend.service.SystemLogService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;


@Aspect
@Component
public class UserServiceAspect {

    @Autowired
    private SystemLogService systemLogService;

    @Before("execution(public * com.spirng.news.springnewsbackend.service.UserService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "Before executing method: " + methodName;
        SystemLog log = new SystemLog(new Date(), message);
        systemLogService.save(log);
    }

    @After("execution(public * com.spirng.news.springnewsbackend.service.UserService.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String message = "After executing method: " + methodName;
        SystemLog log = new SystemLog(new Date(), message);
        systemLogService.save(log);
    }

}
