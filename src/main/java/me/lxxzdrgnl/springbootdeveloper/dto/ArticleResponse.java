package me.lxxzdrgnl.springbootdeveloper.dto;

import lombok.Getter;
import me.lxxzdrgnl.springbootdeveloper.domain.Article;

@Getter
public class ArticleResponse {
    private final String title;
    private final String content;

    public ArticleResponse(Article article) {
        this.title = article.getTitle();
        this.content = article.getContent();
    }
}
