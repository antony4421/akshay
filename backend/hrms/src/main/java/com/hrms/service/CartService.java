package com.hrms.service;

import com.hrms.entity.Cart;
import com.hrms.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartByEmployee(Long employeeId) {
        return cartRepository.findByEmployeeId(employeeId);
    }

    public void deleteByIdAndEmployeeId(Long id, Long employeeId) {
        // Optional: fetch the cart entry first
        Cart cart = cartRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getEmployeeId().equals(employeeId)) {
            throw new RuntimeException("Employee ID mismatch");
        }

        cartRepository.delete(cart);
    }

}
