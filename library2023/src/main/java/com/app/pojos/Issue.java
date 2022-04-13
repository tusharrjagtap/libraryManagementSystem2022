package com.app.pojos;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "issue")
public class Issue 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer iid;
	

	private Integer user_id;
	
	
	@JsonFormat(pattern="yyyy-MM-dd",timezone = "IST")
	private LocalDate issue_date;
	
	@JsonFormat(pattern="yyyy-MM-dd",timezone = "IST")
	private LocalDate due_date;
	private Integer book_id;
	//private Set<Book> issued_books = new HashSet<Book>();
	
	  @Column(name = "return_date")
	    private LocalDate retrunDate;
	    
	    
	    private LocalDate renewedAt;

	    @Column(name = "num_of_times_renewed")
	    private Integer numOfTimesRenewed;
	   
	
	
	public Issue() {
		// TODO Auto-generated constructor stub
	}

	public Issue(LocalDate issue_date, LocalDate due_date) {
		super();
		this.issue_date = issue_date;
		this.due_date = due_date;
	}

	

	

	
	public Issue(Integer iid, Integer user_id, LocalDate issue_date, LocalDate due_date, Integer book_id,
			LocalDate retrunDate, LocalDate renewedAt, Integer numOfTimesRenewed) {
		super();
		this.iid = iid;
		this.user_id = user_id;
		this.issue_date = issue_date;
		this.due_date = due_date;
		this.book_id = book_id;
		this.retrunDate = retrunDate;
		this.renewedAt = renewedAt;
		this.numOfTimesRenewed = numOfTimesRenewed;
		
	}

	
	public Integer getIid() {
		return iid;
	}

	public void setIid(Integer iid) {
		this.iid = iid;
	}

	public LocalDate getIssue_date() {
		return issue_date;
	}

	public void setIssue_date(LocalDate issue_date) {
		this.issue_date = issue_date;
	}

	public LocalDate getDue_date() {
		return due_date;
	}

	public void setDue_date(LocalDate due_date) {
		this.due_date = due_date;
	}

	public LocalDate getRetrunDate() {
		return retrunDate;
	}

	public void setRetrunDate(LocalDate retrunDate) {
		this.retrunDate = retrunDate;
	}

	public LocalDate getRenewedAt() {
		return renewedAt;
	}

	public void setRenewedAt(LocalDate renewedAt) {
		this.renewedAt = renewedAt;
	}

	public Integer getNumOfTimesRenewed() {
		return numOfTimesRenewed;
	}

	public void setNumOfTimesRenewed(Integer numOfTimesRenewed) {
		this.numOfTimesRenewed = numOfTimesRenewed;
	}

	@JoinColumn(name = "user_id")
	public Integer getUser_id() {
		return user_id;
	}
	@Column(name = "book_id")
	public Integer getBook_id() {
		return book_id;
	}


	
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	
	public void setBook_id(Integer book_id) {
		this.book_id = book_id;
	}


	@Override
	public String toString() {
		return "Issue [iid=" + iid + ", issue_date=" + issue_date
				+ ", due_date=" + due_date + "]";
	}
	
}
