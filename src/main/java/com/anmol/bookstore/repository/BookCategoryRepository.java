package com.anmol.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anmol.bookstore.entity.BookCategory;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "bookCategory", path = "book-category")
@CrossOrigin("*")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

}
