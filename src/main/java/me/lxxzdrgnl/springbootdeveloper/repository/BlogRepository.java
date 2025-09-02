package me.lxxzdrgnl.springbootdeveloper.repository;

import me.lxxzdrgnl.springbootdeveloper.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Article, Long> {
}