package com.example.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.SysUser;
import com.example.entity.SysUserRole;
import com.example.server.SysUserService;

import database.SysUserDao;

@Service
public class SysUserServiceimpl implements SysUserService {

 @Autowired
 private SysUserDao sysUserDao;
    
 @Override
 public SysUser selectById(Integer Id) {
 
  return sysUserDao.findById(Id).get();
 }
 @Override
 public SysUser selectByName(String Name) {
  
  return sysUserDao.findByName(Name);
 }

	@Override
	public List<SysUserRole> listByUserId(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}
}