package com.app.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exception.*;
import com.app.pojos.Admin;
import com.app.pojos.Issue;
import com.app.pojos.ResetPassword;
import com.app.pojos.User;
import com.app.service.IUserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
//	//dependency : service layer i/f
	@Autowired
	private IUserService userService;
	
	
	public UserController() {
		System.out.println("in ctor of " + getClass());
	}
	//add request handling method to send all emps to the caller(front end) : getting resources : GET

	@GetMapping
	public ResponseEntity<?> getAllUserDetails()
	{
		System.out.println("in get all users");
	return new ResponseEntity <> (userService.getAll(),HttpStatus.OK) ;
	}
	//add request handling method to insert new emp detaild(create a new resource) : POST
	
	@PostMapping
	public User addUserDetails(@RequestBody  User e) //de-serial (un marshalling)
	{
		
		System.out.println("in add User "+e);
		return userService.addOrUpdateUserDetails(e);
	}
	
	//add request handling method to delete emp details by emp id
	//Request URL  sent by front end : http://host:port/api/Users/1234 , method=DELETE
	@DeleteMapping("/{id}")
	public String deleteUserDetails(@PathVariable int id)
		{
	System.out.println("in del user dtls "+id);
		return userService.deleteUserDetails(id);
	}
	
//	//add req handling method to get selected emp details by id.
//	//URL : http://host:port/api/Users/1234 , method=GET
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserDetails(@PathVariable int userId)
	{
		System.out.println("in get user dtls "+userId);
//		//invoke service layer's method
		try {
			// invoke service layer's method
			return new ResponseEntity<>(userService.fetchUserDetails(userId), HttpStatus.OK);
		}catch (Exception e) {
			System.out.println("err in get user dtls"+e);
			return new ResponseEntity<> (e.getMessage(),HttpStatus.NOT_FOUND);
			
			
		}
//
	}
	
	
	//add request handling method to update existing emp details (update a  resource) : PUT
		@PutMapping
		public User updateUserDetails(@RequestBody  User e) //de-serial (un marshalling) 
		{
			//e : DETACHED POJO , containing updated state
			System.out.println("in putmapping user "+e);
			return userService.addOrUpdateUserDetails(e);
	}
		
		
		@PostMapping("/issue/{uid}/{bid}")
		public ResponseEntity<?> issueBook(@PathVariable Integer uid, @PathVariable Integer bid) throws Exception
		{
			Issue issued = userService.issueBook(uid,bid);
			try {
				
				if (issued == null)
					return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
				return new ResponseEntity<Issue>(issued, HttpStatus.OK);
			}catch(CustomRuntimeException e) {
				return new ResponseEntity<Issue>(issued, HttpStatus.NO_CONTENT);
			}
			
			}
			
		
		
//		@GetMapping("return/{iid}")
//		public ResponseEntity<?> returnBook(@PathVariable int iid)
//		{
//			//Issue issued = userService.returnBook(iid);
//			return null;
//			if (issued == null)
//				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//			return new ResponseEntity<Issue>(issued, HttpStatus.OK);
//		}
		
		
		
		  @GetMapping("/issuebook") //working for reservation
		  public ResponseEntity<?> allIssueBook()
			{
			System.out.println("in allBook");
				try {
				
				return new ResponseEntity<>(userService.getAllissueBookForReservation(), HttpStatus.OK);
				}catch(CustomRuntimeException e)
				{
					return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);	
				}
			
			}
		
		  @PutMapping("/renew/{issueId}") 
		  public ResponseEntity<?> renewBook( @PathVariable Integer issueId){
			  
			  System.out.println("in renew");
			  try {
				  
				  return new ResponseEntity<>(userService.renewBook(issueId),HttpStatus.OK);
				  
				  
			  }catch(CustomRuntimeException e){
				  return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			  }
			  
			  
		  }

			@PostMapping("/login")
			public ResponseEntity<?> login(@RequestBody User user){
				Map<String,String> map = new HashMap<>();
				try {
					User userByEmailAndPassword = userService.findByEmailAndPassword(user.getEmail(), user.getPassword());
					if (userByEmailAndPassword!=null) {
						map.put("userID", userByEmailAndPassword.getId().toString());
						map.put("email", userByEmailAndPassword.getEmail());
						map.put("token", "123456");
						map.put("name", userByEmailAndPassword.getFirst_name());
						map.put("role", (userByEmailAndPassword.getRole()).toString());
						map.put("address",userByEmailAndPassword.getAddress());
						//map.put("role", user.getRole());//userByEmailAndPassword.getRole()
						//map.put("role", (user.getRole()).toString());
					
						//return new ResponseEntity<>(map,HttpStatus.OK);
						return new ResponseEntity<>(map,HttpStatus.OK);
					} else {
						map.clear();
						map.put("message","Invalid user");
						map.put("Token",null);
						return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED);
						//return "/user/login";
					}
				} catch (Exception e) {
					map.clear();
					map.put("message",e.getMessage());
					map.put("Token",null);
					return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED);
					//return "/user/login";
				}
			}
			

			@GetMapping("/email/{email}")
			public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
					User user = userService.findByEmail(email);
				return new ResponseEntity<User>(user, HttpStatus.CREATED);
			}
		@PostMapping("/return/{iid}")
		public boolean returnBook(@PathVariable Integer iid) {
			 return userService.returnBook(iid);
		}
		
		@PostMapping("/reset")
		public boolean reset(@RequestBody ResetPassword resetPass) {
			System.out.println("inputs"+resetPass);
			return userService.resetPassword(resetPass.getEmail(), resetPass.getPassword(),resetPass.getNewPassword());
			
		}
		@GetMapping("/issuedBooks/{userId}")
		public ResponseEntity<?> getIssuedBooksByUserDetails(@PathVariable int userId)
		{
			System.out.println("in get user dtls "+userId);
//			//invoke service layer's method
			try {
				// invoke service layer's method
				return new ResponseEntity<>(userService.issuedBooksByUser(userId), HttpStatus.OK);
			}catch (Exception e) {
				System.out.println("err in get user dtls"+e);
				return new ResponseEntity<> (e.getMessage(),HttpStatus.NOT_FOUND);
				
				
			}
	//
		}
		
}
