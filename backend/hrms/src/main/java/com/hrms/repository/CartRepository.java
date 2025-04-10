package com.hrms.repository;

import com.hrms.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByEmployeeId(Long employeeId);
    void deleteByIdAndEmployeeId(Long id, Long employeeId);
    

}
