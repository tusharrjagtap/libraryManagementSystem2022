package com.app.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.StaffRepository;
import com.app.pojos.ResetPassword;
import com.app.pojos.Staff;
import com.app.pojos.User;

@Service
@Transactional
public class StaffServiceImpl implements IStaffService {
	// dependency : dao layer i/f
	@Autowired
	private StaffRepository staffRepo;

	@Override
	public List<Staff> getAllStaffs() {
		// Method of JpaRepository : super i/f dao layer i/f
		// Inherited API : public List<T> findAll();
		return staffRepo.findAll();// tx over => sesison closed , rets List of detached entities to the caller
	}

	@Override
	public Staff addOrUpdateStaffDetails(Staff staff) {
		// TODO Auto-generated method stub
		return staffRepo.save(staff);
		//CrudRepository Methd : save(T entity)
		//Checks if id == null => transient entity , will fire insert upon commit
		//if id != null => detached entity , will fire update upon commit
	}// what will method ret ? DETACHED Staff ---> to the controller

	@Override
	public String deleteStaffDetails(int id) {
		// service layer invokes dao's method
		staffRepo.deleteById(id);
		return "Staff Details with ID " + id + " deleted successfuly... ";
	}

	@Override
	public Staff fetchStaffDetails(int staffId) {
		// invoke dao's method
		// Optional<Staff> optional = staffRepo.findById(StaffId);
		return staffRepo.findById(staffId)
				.orElseThrow(() -> new ResourceNotFoundException("staff by ID " + staffId + " not found!!!!"));
	}

	@Override
	public Staff findByEmailAndPassword(String email, String password) {
		return staffRepo.findByEmailAndPassword(email, password);
	}

	@Override
	public Staff findByEmail(String email) {
		return staffRepo.findById(email)
				.orElseThrow(() -> new ResourceNotFoundException("User " + email + " not found!!!!"));
	}

	@Override   
	public boolean resetPassword(String email, String password,String newpassword) {
		
		            List<Staff> staff=staffRepo.findByEmail(email);
		            if(staff.get(0).getPassword().equals(password))
		            	staff.get(0).setPassword(newpassword);
		            else
		            	return false;
		            staffRepo.save(staff.get(0));
		            return true;
	}
	
}
