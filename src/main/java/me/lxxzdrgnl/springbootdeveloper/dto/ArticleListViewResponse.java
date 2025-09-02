package me.lxxzdrgnl.springbootdeveloper.dto;

import lombok.Getter;
import me.lxxzdrgnl.springbootdeveloper.domain.Article;

@Getter
public class ArticleListViewResponse {

    private final long id;
    private final String title;
    private final String content;
    private final String author;

    public ArticleListViewResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.author = article.getAuthor();
    }
}
