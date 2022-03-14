package com.example.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.database.SysRoleDao;
import com.example.entity.SysRole;
import com.example.server.SysRoleService;

@Service
public class SysRoleServiceimpl implements SysRoleService {

	@Autowired
	private SysRoleDao sysRoleDao;

	@Override
	public SysRole selectById(Integer Id) {
		// TODO Auto-generated method stub
		return sysRoleDao.findById(Id).get();
	}

}