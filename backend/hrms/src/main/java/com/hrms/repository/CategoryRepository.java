package com.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hrms.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
