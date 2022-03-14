package com.example.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.SysUserRoleDao;
import com.example.entity.SysUser;
import com.example.entity.SysUserRole;
import com.example.server.SysUserRoleService;

@Service
public class SysUserRoleServiceimpl implements SysUserRoleService {

	@Autowired
	private SysUserRoleDao sysUserRoleDao;

	@Override
	public List<SysUserRole> listByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return sysUserRoleDao.listByUserId(userId);
	}

	@Override
	public SysUser selectById(Integer Id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public SysUser selectByName(String Name) {
		// TODO Auto-generated method stub
		return null;
	}

}
