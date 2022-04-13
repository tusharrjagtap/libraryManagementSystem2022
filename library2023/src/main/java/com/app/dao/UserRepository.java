package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.app.pojos.Issue;
import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	Optional<User> findById(Integer userId);

	Optional<User> findById(String email);

	User findByEmailAndPassword(String email, String password);

	List<User> findByEmail(String email);

}
