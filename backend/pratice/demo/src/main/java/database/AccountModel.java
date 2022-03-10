package database;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "account")
public class AccountModel {
	@Id
	private String account;
	private String name;
	private String password;
	  
}