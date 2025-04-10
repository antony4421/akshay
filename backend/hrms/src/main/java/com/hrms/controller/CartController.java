package com.hrms.controller;

import com.hrms.entity.Cart;

import com.hrms.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    @GetMapping("/{employeeId}")
    public List<Cart> getCartByEmployee(@PathVariable Long employeeId) {
        return cartService.getCartByEmployee(employeeId);
    }

    @DeleteMapping("/{id}/employee/{employeeId}")
    public ResponseEntity<String> deleteByIdAndEmployeeId(
            @PathVariable Long id,
            @PathVariable Long employeeId) {

        cartService.deleteByIdAndEmployeeId(id, employeeId);
        return ResponseEntity.ok("Deleted item with ID " + id + " for employee " + employeeId);
    }


}

