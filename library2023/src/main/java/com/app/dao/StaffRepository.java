package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.app.pojos.Staff;
import com.app.pojos.User;

public interface StaffRepository extends JpaRepository<Staff, Integer>{

	Staff findByEmailAndPassword(String email, String password);

	Optional<Staff> findById(String email);

	List<Staff> findByEmail(String email);

	

	//Optional<Employee> findBySalaryGreaterThanValue(double value)
//update employees set join_date='2020-11-21',last_name='Kher',salary=53456 where id=6;

}
