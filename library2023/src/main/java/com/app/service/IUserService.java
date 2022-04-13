package com.app.service;

import java.util.List;

import com.app.pojos.Issue;
import com.app.pojos.User;

public interface IUserService<Books> {
	List<User> getAll();
	User addOrUpdateUserDetails(User transientUser);
	String deleteUserDetails(int id);
	User fetchUserDetails(int userId);
	Issue issueBook(Integer uid, Integer bid) throws Exception;
	//Issue returnBook(int iid);
	
	//List<Issue> getIsuuesById(int id);
	//List<Issue> getlistIssued();
	Object getAllissueBookForReservation();
	
	String renewBook(Integer issueId);
	User findByEmail(String email);
	User findByEmailAndPassword(String email, String password);
	User authenticate(String email, String password);
	boolean returnBook(int iid);
	
	boolean resetPassword(String email, String password, String newpassword);
	List<Books> issuedBooksByUser(int userId);
	
	
	
	
	
	
	
}
