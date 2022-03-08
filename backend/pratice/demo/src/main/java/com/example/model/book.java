package com.example.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class book {
	 	@Id
	    @GeneratedValue
	    private Integer bookid;
	    private String name;
	    private String author;
}
