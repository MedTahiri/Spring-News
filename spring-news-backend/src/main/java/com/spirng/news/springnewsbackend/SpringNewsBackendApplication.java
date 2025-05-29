package com.spirng.news.springnewsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
public class SpringNewsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringNewsBackendApplication.class, args);
	}

}
