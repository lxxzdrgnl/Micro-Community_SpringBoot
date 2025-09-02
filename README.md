# Spring Boot Blog Project

This project is a **small community application** developed based on the book  
**"스프링부트3 백엔드 개발자 되기 (Becoming a Spring Boot 3 Back-End Developer)"**.  

It started as a learning project from the book but has been further extended and enhanced with additional features such as improved UI with Thymeleaf, community features like comments, and role-based access control where only the author can edit or delete their own posts.

The goal is to gain practical experience with **Spring Boot 3, JPA, and web application development** while also applying real-world best practices.

---

## Access Deployed Service
This project is deployed to **AWS Elastic Beanstalk**:  
👉 **http://springboot-developer-env.eba-ts3fqw6e.ap-northeast-2.elasticbeanstalk.com/articles**

---

## Features

- **CRUD** (Create, Read, Update, Delete) operations for blog articles via RESTful API
- **Web UI** built with Thymeleaf
- **Article management**: list, view, create, update, delete
- **Spring Data JPA** integration with MySQL (H2 for development)
- **Auditing**: automatic tracking of created/modified timestamps (`@CreatedDate`, `@LastModifiedDate`)
- **JWT-based Authentication/Authorization**
- **OAuth 2.0** social login (Google)
- **User registration and management**

---

## Tech Stack

- **Backend**: Spring Boot 3, Spring MVC, Spring Data JPA, JWT, OAuth 2.0  
- **Frontend**: Thymeleaf, Bootstrap  
- **Database**: MySQL (Production) / H2 (Development)  
- **Build Tool**: Gradle  
- **Deployment**: AWS Elastic Beanstalk  / AWS RDS

---

## Folder Structure
```
src
 ├── main
 │   ├── java
 │   │   └── me.lxxzdrgnl.springbootdeveloper
 │   │       ├── config        # Security (JWT, OAuth2) and other configurations
 │   │       │   ├── jwt       # JWT-related configuration (JwtProperties, TokenProvider)
 │   │       │   └── oauth     # OAuth 2.0 configuration
 │   │       ├── controller    # API & View request handlers
 │   │       ├── domain        # JPA Entities (Article, User, RefreshToken)
 │   │       ├── dto           # DTOs (AddArticleRequest, ArticleResponse, etc.)
 │   │       ├── repository    # JPA Repositories
 │   │       ├── service       # Business logic
 │   │       └── util          # Utility classes
 │   └── resources
 │       ├── static            # Static files (CSS, JS, images)
 │       ├── templates         # Thymeleaf templates (.html)
 │       └── application.yml   # Configuration file (excluded via .gitignore)
```

> **Note:**  
> The `application.yml` file is excluded from version control using `.gitignore` for security and environment-specific configuration.