package com.example.database;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "sys_user")
public class AccountModel {
	@Id
	private Integer id;
	private String username;
	private String password;
}