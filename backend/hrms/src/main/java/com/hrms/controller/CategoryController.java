package com.hrms.controller;

import com.hrms.entity.Category;
import org.springframework.http.ResponseEntity;
import com.hrms.repository.CategoryRepository;


import com.hrms.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @Autowired
    private CategoryRepository categoryRepository;
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        return categoryRepository.findById(id)
            .map(existingCategory -> {
                existingCategory.setName(updatedCategory.getName());
                existingCategory.setImage(updatedCategory.getImage());
                Category savedCategory = categoryRepository.save(existingCategory);
                return ResponseEntity.ok(savedCategory);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }
}
