package me.lxxzdrgnl.springbootdeveloper.repository;

import me.lxxzdrgnl.springbootdeveloper.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
