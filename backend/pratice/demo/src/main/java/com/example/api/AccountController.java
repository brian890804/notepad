package com.example.api;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.SYSTEM_CODE;
import com.example.server.AccountRepository;
import com.example.system.RestApiResponse;

import database.AccountModel;

@RestController
public class AccountController {
	@Autowired
	private AccountRepository accountRepository;

	@PostMapping("/register")
	public RestApiResponse register(@RequestBody String account, String password, String name) {
		try {
			AccountModel accountModel = new AccountModel();
			accountModel.setAccount(account);
			accountModel.setPassword(password);
			accountModel.setName(name);
			accountRepository.save(accountModel);
			return new RestApiResponse(SYSTEM_CODE.ERROR.name(), "error");
		} catch (RuntimeException e) {
			e.getMessage();
			return null;
		}

	}
	@PostMapping("/login")
	public RestApiResponse Login(@RequestBody AccountModel accountModel) {
		Optional<AccountModel> account;
		try {
			account = accountRepository.findByAccountAndPassword(accountModel.getAccount(), accountModel.getPassword());
			if(!account.isEmpty()) {
				return new RestApiResponse(SYSTEM_CODE.SUCCESS.name(), account.get());
			} else {
				return new RestApiResponse(SYSTEM_CODE.ERROR.name(), "error");
			}
		} catch (RuntimeException e) {
			e.getMessage();
			return null;
		}
		
	}
    @GetMapping
	public Map<Integer, String> hello() {
		Map<Integer, String> map = new HashMap<Integer, String>();
		map.put(1, "hello");
		map.put(2, "test");
        return map;
    }
}
