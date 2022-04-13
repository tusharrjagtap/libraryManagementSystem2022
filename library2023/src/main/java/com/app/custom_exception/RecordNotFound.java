package com.app.custom_exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecordNotFound extends RuntimeException{

	/**
	 * 
	 */
	

	public RecordNotFound(String msg)
	{
		super(msg);
	}
}
