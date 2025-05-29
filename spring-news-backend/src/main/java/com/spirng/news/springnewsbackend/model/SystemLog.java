package com.spirng.news.springnewsbackend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "systemlog")
public class SystemLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;

    private String message;

    public SystemLog() {
    }

    public SystemLog(Date date, String message) {
        this.date = date;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
