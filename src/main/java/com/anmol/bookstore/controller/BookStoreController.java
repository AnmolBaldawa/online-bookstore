package com.anmol.bookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anmol.bookstore.entity.Book;
import com.anmol.bookstore.entity.BookCategory;
import com.anmol.bookstore.repository.BookCategoryRepository;
import com.anmol.bookstore.repository.BookRepository;

@RestController
public class BookStoreController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private BookCategoryRepository bookCategoryRepository;
	
	@GetMapping("/all")
	public String getAll() {
		List<Book> booksList = bookRepository.findAll();
		Book book = booksList.get(0);
		System.out.println(book);
		
		List<BookCategory> bookCategories = bookCategoryRepository.findAll();
		BookCategory bookCategory = bookCategories.get(0);
		System.out.println(bookCategory);
		return "Hello";
	}
}
