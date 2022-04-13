package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.constant.Constants;
import com.app.custom_exception.CustomRuntimeException;
import com.app.custom_exception.DependanceyException;
import com.app.custom_exception.RecordNotFound;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BookRepository;
import com.app.dao.IssueReository;
import com.app.dao.UserRepository;

import com.app.pojos.Issue;
import com.app.pojos.Admin;
import com.app.pojos.Book;

import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl<Books> implements IUserService {
	//dependency : dao layer i/f
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private IssueReository issueRepo;
   @Autowired
   private BookRepository bookRepo;

	@Override
	public List<User> getAll() {
		// Method of JpaRepository : super i/f dao layer i/f
		//Inherited API : public List<T> findAll();
		return userRepo.findAll();
	}

	@Override
	public User addOrUpdateUserDetails(User user) {
		// TODO Auto-generated method stub
		user.setFine(0);
		return userRepo.save(user);
		//CrudRepository Methd : save(T entity)
		//Checks if id == null => transient entity , will fire insert upon commit
		//if id != null => detached entity , will fire update upon commit
	}// what will method ret ? DETACHED emp ---> to the controller

	@Override
	public String deleteUserDetails(int id) {
		// service layer invokes dao's method
		userRepo.deleteById(id);
		return "User Details with ID " + id + " deleted successfuly... ";
	}

	@Override
	public User fetchUserDetails(int userId) {
		// invoke dao's method
		// Optional<Employee> optional = employeeRepo.findById(empId);
		return userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Emp by ID " + userId + " not found!!!!"));
	}

	
	@Override
	public Issue issueBook(Integer uid,  Integer bid) throws CustomRuntimeException
	{
		
		Issue issueBook=new Issue();
		List<Book> books = bookRepo.findAll();
		Book book = null;
		for (Book b : books) {
			if(b.getBid() == bid) {
				book = b;
			}
		}
		//Book book=bookRepo.getById(issueBook.getBook_id());
		System.out.println(book);
		issueBook.setBook_id(bid);
		issueBook.setUser_id(uid);
		issueBook.setIssue_date(LocalDate.now());
		issueBook.setDue_date(LocalDate.now().plusDays(0));
		issueBook.setNumOfTimesRenewed(0);
		issueRepo.save(issueBook);
		book.setNoOfCopies(book.getNoOfCopies() - 1);
		return issueBook;
	}
	

	@Override
	public List<Issue> getAllissueBookForReservation() {

		List<Issue> listOfIssues = issueRepo.findAll();
	     List<Issue> resListOfIssue= new ArrayList<Issue>();
	       for(Issue r:listOfIssues )
	       {
	    	   if(r.getRetrunDate() == null)
	    		   resListOfIssue.add(r);
	       }
		return resListOfIssue;
	}
	

	@Override
	public String renewBook(Integer issueId) {
		String res = null;
		Issue issue = issueRepo.findById(issueId).orElseThrow(()->new RecordNotFound("this book is not issued"));
		if(issue.getNumOfTimesRenewed() < 5) {
			issue.setNumOfTimesRenewed(issue.getNumOfTimesRenewed() + 1);
			issue.setRenewedAt(LocalDate.now());
			res = "SUCCESS";
		} else {
			res = "ERROR";
		}
		return res;
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findById(email)
				.orElseThrow(() -> new ResourceNotFoundException("User " + email + " not found!!!!"));
	}

	@Override
	public User findByEmailAndPassword(String email, String password) {
		return userRepo.findByEmailAndPassword(email, password);
		
		
	}
	
	

	@Override
	public User authenticate(String email, String password) {
		User user = findByEmail(email);
		
		if(user != null && user.getPassword().equals(password))
		   return user;
		return null;
	}
	
	@Override
	public boolean returnBook(int iid) {
		List<Book> book = bookRepo.findAll();
		Issue issueBook=issueRepo.getById(iid);
		User user = userRepo.getById(issueBook.getUser_id());
		if(issueBook.getDue_date().isBefore(LocalDate.now())) {
			//fined
			int dueDays = LocalDate.now().compareTo(issueBook.getDue_date());
			user.setFine(user.getFine() + (dueDays));
		}
		issueBook.setRetrunDate(LocalDate.now());
		int bid=issueBook.getBook_id();
		int noOfCopies=book.get(bid).getNoOfCopies();
		book.get(bid).setNoOfCopies(noOfCopies);
//		int noOfCopies=((Book) book).getNoOfCopies();
//		((Book) book).setNoOfCopies(noOfCopies+1);
		return true;
	}
	
	
	
	@Override   
	public boolean resetPassword(String email, String password,String newpassword) {
		System.out.println("in user reset password.........................");
		            List<User> user=userRepo.findByEmail(email);
		            if(user.get(0).getPassword().equals(password))
		            	user.get(0).setPassword(newpassword);
		            else
		            	return false;
		            userRepo.save(user.get(0));
		            return true;
	}

	@Override
	public List<Book> issuedBooksByUser(int userId) {
		
//		Issue issueBook=new Issue();
//		List<Book> books=new ArrayList<Book>();
//		while(issueBook.getUser_id()==userId) {
//			int bid=issueBook.getBook_id();
//			//List<Issue> resListOfIssue= new ArrayList<Issue>();
//			
//			books=bookRepo.findAllById(bid);
//			
//			
//		}
//		return books;
		return null;
	}


	
}





	

	

	
	

