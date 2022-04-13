package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.app.pojos.Issue;


public interface IssueReository extends JpaRepository<Issue, Integer> {

	
//     Integer findByUser_id();
//     Integer findByBook_id(); 



}
