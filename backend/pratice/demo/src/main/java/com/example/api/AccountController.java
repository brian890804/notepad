package com.example.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SYSTEM_CODE;
import com.example.database.AccountModel;
import com.example.database.SysUserDao;
import com.example.database.SysUserRoleDao;
import com.example.entity.SysUser;
import com.example.entity.SysUserRole;
import com.example.system.RestApiResponse;

@RestController
public class AccountController {
	@Autowired
	private SysUserDao sysUserDao;
	@Autowired
	private SysUserRoleDao sysUserRoleDao;
	@PostMapping("/register")
	public RestApiResponse register(@RequestBody AccountModel account) {
		try {
			SysUser sysUser = new SysUser();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			sysUser.setName(account.getUsername());
			sysUser.setPassword(encoder.encode(account.getPassword()));
			sysUserDao.save(sysUser);

			SysUserRole sysUserRole = new SysUserRole();
			sysUserRole.setRoleid(2);
			sysUserRole.setUserid(sysUser.getId());
			sysUserRoleDao.save(sysUserRole);

			return new RestApiResponse(SYSTEM_CODE.SUCCESS.name(), "Success");
		} catch (RuntimeException e) {
			e.getMessage();
			return new RestApiResponse(SYSTEM_CODE.ERROR.name(), "Error");
		}

	}

	@GetMapping
	public Map<Integer, String> hello() {
		Map<Integer, String> map = new HashMap<Integer, String>();
		map.put(1, "hello");
		map.put(2, "test");
		return map;
	}

	@RequestMapping("/")
	public String showHome() {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();

		return "home.html";
	}

//	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String printAdmin() {
		return "ff";
	}
}
