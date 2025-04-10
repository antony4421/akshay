package com.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.hrms.entity.Employee;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Optional<Employee> findByEmail(String email);
	Employee findById(long employeeId); 
    @Query("SELECT e FROM Employee e WHERE e.email = :email AND e.password = :password")
    Optional<Employee> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}


