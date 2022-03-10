package com.example.server;

import java.util.List;

import com.example.entity.SysUser;
import com.example.entity.SysUserRole;

public interface SysUserRoleService {
	SysUser selectById(Integer Id);
	SysUser selectByName(String Name);

	List<SysUserRole> listByUserId(Integer userId);
}