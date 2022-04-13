package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.app.pojos.ResetPassword;
import com.app.pojos.Staff;
import com.app.pojos.User;
import com.app.service.IStaffService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/staffs")
public class StaffController {
	
	//dependency : service layer i/f
	@Autowired
	private IStaffService staffService;
	
	public StaffController() {
		System.out.println("in ctor of " + getClass());
	}
	//add request handling method to send all Staff to the caller(front end) : getting resources : GET
	@GetMapping
	public ResponseEntity<?> getAllStaffDetails()
	{
		System.out.println("in get all Staffs");
		return new ResponseEntity <> (staffService.getAllStaffs(),HttpStatus.OK) ;
	}
	//add request handling method to insert new Staff detaild(create a new resource) : POST
	@PostMapping
	public Staff addStaffDetails(@RequestBody  Staff e) //de-serial (un marshalling)
	{
		
		System.out.println("in add Staff "+e);
		return staffService.addOrUpdateStaffDetails(e);
	}
	//add request handling method to delete Staff details by Staff id
	//Request URL  sent by front end : http://host:port/api/Staffs/1234 , method=DELETE
	@DeleteMapping("/{id}")
	public String deleteStaffDetails(@PathVariable int id)
	{
		System.out.println("in del Staff dtls "+id);
		return staffService.deleteStaffDetails(id);
	}
	//add req handling method to get selected Staff details by id.
	//URL : http://host:port/api/Staffs/1234 , method=GET
	@GetMapping("/{staffId}")
	public ResponseEntity<?> getStaffDetails(@PathVariable int staffId)
	{
		System.out.println("in get staff dtls "+staffId);
		//invoke service layer's method
		try {
			// invoke service layer's method
			return new ResponseEntity<>(staffService.fetchStaffDetails(staffId), HttpStatus.OK);
		}catch (Exception e) {
			System.out.println("err in get staff dtls"+e);
			return new ResponseEntity<> (e.getMessage(),HttpStatus.NOT_FOUND);
			
			
		}
		
		
	}
	//add request handling method to update existing emp details (update a  resource) : PUT
		@PutMapping
		public Staff updateStaffDetails(@RequestBody  Staff e) //de-serial (un marshalling) 
		{
			//e : DETACHED POJO , containing updated state
			System.out.println("in add staff "+e);
			return staffService.addOrUpdateStaffDetails(e);
		}
	
		
		@PostMapping("/login")
		public ResponseEntity<?> login(@RequestBody Staff staff){
			Map<String,String> map = new HashMap<>();
			try {
				Staff staffByEmailAndPassword = staffService.findByEmailAndPassword(staff.getEmail(), staff.getPassword());
				if (staffByEmailAndPassword!=null) {
					map.put("staffID", staffByEmailAndPassword.getId().toString());
					map.put("email", staffByEmailAndPassword.getEmail());
					map.put("token", "123456");
					map.put("name", staffByEmailAndPassword.getFirst_name());
					map.put("role", "STAFF");
					map.put("address",staffByEmailAndPassword.getAddress());
					//map.put("role", staff.getRole());//staffByEmailAndPassword.getRole()
					//map.put("role", (staff.getRole()).toString());
				
					//return new ResponseEntity<>(map,HttpStatus.OK);
					return new ResponseEntity<>(map,HttpStatus.OK);
				} else {
					map.clear();
					map.put("message","Invalid staff");
					map.put("Token",null);
					return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED);
					//return "/staff/login";
				}
			} catch (Exception e) {
				map.clear();
				map.put("message",e.getMessage());
				map.put("Token",null);
				return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED);
				//return "/staff/login";
			}
		}
		

		@GetMapping("/email/{email}")
		public ResponseEntity<Staff> getStaffByEmail(@PathVariable String email) {
				Staff staff = staffService.findByEmail(email);
			return new ResponseEntity<Staff>(staff, HttpStatus.CREATED);
		}
	
		@PostMapping("/reset")
		public boolean reset(@RequestBody ResetPassword resetPass) {
			
			return staffService.resetPassword(resetPass.getEmail(), resetPass.getPassword(),resetPass.getNewPassword());
			
		}
		
		
}
