package com.example.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.entity.SysRole;
import com.example.entity.SysUser;
import com.example.entity.SysUserRole;
import com.example.server.SysRoleService;
import com.example.server.SysUserRoleService;
import com.example.server.SysUserService;

import lombok.extern.log4j.Log4j2;

@Service("userDetailsService")
@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private SysUserService userService;

	@Autowired
	private SysRoleService roleService;

	@Autowired
	private SysUserRoleService userRoleService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		// 从数据库中取出用户信息
		SysUser user = userService.selectByName(username);

		// 判断用户是否存在
		if (user == null) {
			throw new UsernameNotFoundException("用户名不存在");
		}
		log.info("in here");
		// 添加权限

		List<SysUserRole> userRoles = userRoleService.listByUserId(user.getId());
		System.out.println("--------" + userRoles.get(0).getUserid());
		System.out.println("--------" + userRoles.get(0).getRoleid());

		for (SysUserRole userRole : userRoles) {
			System.out.println("--------" + userRole.getRoleid().toString());

			SysRole role = roleService.selectById(userRole.getRoleid());

			System.out.println("--------" + role.getName().toString());

			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}
		System.out.println("--------" + userRoles.size());

		// 返回UserDetails实现类
		return new User(user.getName().toString(), user.getPassword(), authorities);
	}
}