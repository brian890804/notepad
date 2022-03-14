package com.example.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.SysUser;

@Repository
public interface SysUserDao extends JpaRepository<SysUser, Integer> {
	@Query(value = "SELECT * FROM sys_user WHERE name = ?1", nativeQuery = true)
	public SysUser findByName(String username);
}