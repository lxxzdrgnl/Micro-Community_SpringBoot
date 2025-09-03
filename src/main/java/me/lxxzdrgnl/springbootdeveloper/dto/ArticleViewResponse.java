package me.lxxzdrgnl.springbootdeveloper.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import me.lxxzdrgnl.springbootdeveloper.domain.Article;
import me.lxxzdrgnl.springbootdeveloper.domain.Comment;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
public class ArticleViewResponse {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String author;
    private List<Comment> comments;

    public ArticleViewResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.createdAt = article.getCreatedAt();
        this.author = article.getAuthor();
        this.comments = article.getComments();
    }
}
