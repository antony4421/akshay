package com.hrms.repository;

import com.hrms.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByEmployeeId(Long employeeId);
    Optional<Wishlist> findByEmployeeIdAndProductId(Long employeeId, Long productId);
    void deleteByEmployeeIdAndProductId(Long employeeId, Long productId);
}

