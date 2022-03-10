package com.example.server;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import database.AccountModel;

@Repository
public interface AccountRepository extends CrudRepository<AccountModel, String>{
	Optional<AccountModel> findByAccountAndPassword(String account, String password);
}
