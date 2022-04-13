package com.app.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.enums.Category;
import com.app.pojos.Book;
import com.app.pojos.Issue;
import com.app.pojos.User;

public interface BookRepository extends JpaRepository<Book, String>{

	List<Book> findByAuthor(String author);

	List<Book> findByTitle(String title);

	List<Book> findByCategory(Category category);

//	List<Book> findAllById(int bid);

	



	

	

	

	

	


	

	

	

	


	

}
