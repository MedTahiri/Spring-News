package com.spirng.news.springnewsbackend.controller;

import com.spirng.news.springnewsbackend.dto.CommentRequest;
import com.spirng.news.springnewsbackend.dto.CommentResponse;
import com.spirng.news.springnewsbackend.model.Article;
import com.spirng.news.springnewsbackend.model.Comment;
import com.spirng.news.springnewsbackend.model.User;
import com.spirng.news.springnewsbackend.service.ArticleService;
import com.spirng.news.springnewsbackend.service.CommentService;
import com.spirng.news.springnewsbackend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserService userService;

    @PostMapping("/article/{articleId}")
    @Operation(
            summary = "Add a comment to an article",
            description = "Adds a new comment to the specified article. User ID is obtained from cookie."
    )
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable Long articleId,
            @RequestBody CommentRequest request,
            HttpServletRequest httpRequest) {

        // Get user ID from cookie
        Long userId = getUserIdFromCookie(httpRequest);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            Article article = articleService.getArticleById(articleId);
            User user = userService.findUserEntityById(userId);

            Comment comment = new Comment(article, user, request.getContent());
            Comment savedComment = commentService.saveComment(comment);

            CommentResponse response = new CommentResponse(savedComment);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/article/{articleId}")
    @Operation(
            summary = "Get comments for an article",
            description = "Retrieves a list of comments associated with the specified article."
    )
    public ResponseEntity<List<CommentResponse>> getCommentsByArticle(@PathVariable Long articleId) {
        try {
            List<Comment> comments = commentService.getCommentsByArticleId(articleId);
            List<CommentResponse> responses = comments.stream()
                    .map(CommentResponse::new)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{commentId}")
    @Operation(
            summary = "Delete a comment",
            description = "Deletes a comment by its ID. User must be the comment owner. User ID is obtained from cookie."
    )
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            HttpServletRequest httpRequest) {

        Long userId = getUserIdFromCookie(httpRequest);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            Comment comment = commentService.getCommentById(commentId);

            // Check if user owns the comment or is admin
            if (!comment.getUser().getId().equals(userId) &&
                    !userService.isUserAdmin(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            commentService.deleteComment(commentId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    private Long getUserIdFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userId".equals(cookie.getName())) {
                    try {
                        return Long.parseLong(cookie.getValue());
                    } catch (NumberFormatException e) {
                        return null;
                    }
                }
            }
        }
        return null;
    }
}