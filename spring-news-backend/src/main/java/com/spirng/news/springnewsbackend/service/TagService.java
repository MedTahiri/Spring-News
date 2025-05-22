package com.spirng.news.springnewsbackend.service;

import com.spirng.news.springnewsbackend.model.Tag;
import com.spirng.news.springnewsbackend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public Tag findOrCreateByName(String name) {
        // Try to find existing tag by name
        Tag existingTag = tagRepository.findByName(name);

        if (existingTag != null) {
            return existingTag;
        }

        // Create new tag if it doesn't exist
        Tag newTag = new Tag(name);
        return tagRepository.save(newTag);
    }

    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }
}