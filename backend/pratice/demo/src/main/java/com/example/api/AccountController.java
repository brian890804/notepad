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
import com.example.model.AccountModel;
import com.example.server.AccountRepository;
import com.example.system.RestApiResponse;

@RestController
public class AccountController {
	@Autowired
	private AccountRepository accountRepository;
	@PostMapping("/test")
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
    public Map hello() {
        Map map = new HashMap();
        map.put("say", "hello");
        return map;
    }
}
