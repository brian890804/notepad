package com.example.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.SysUserRole;

@Repository
public interface SysUserRoleDao  extends JpaRepository <SysUserRole,Integer>{
 @Query(value = "SELECT * FROM sys_user_role WHERE userid = ?1" , nativeQuery = true)
 public  List<SysUserRole> listByUserId(Integer userId);
}
