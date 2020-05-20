package com.anmol.bookstore.config;

import com.anmol.bookstore.entity.Book;
import com.anmol.bookstore.entity.BookCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Book.class, BookCategory.class);
        //config.getCorsRegistry().addMapping("/**").allowedOrigins("http://localhost:4200/");
    }
}
