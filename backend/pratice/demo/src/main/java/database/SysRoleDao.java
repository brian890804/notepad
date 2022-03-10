package database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.SysRole;

@Repository
public interface SysRoleDao extends JpaRepository<SysRole, Integer> {
}
