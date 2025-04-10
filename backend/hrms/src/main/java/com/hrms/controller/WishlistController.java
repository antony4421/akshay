package com.hrms.controller;


import com.hrms.entity.Wishlist;
import com.hrms.service.WishlistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{employeeId}")
    public List<Wishlist> getWishlist(@PathVariable Long employeeId) {
        return wishlistService.getWishlistByEmployeeId(employeeId);
    }

    @PostMapping
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.addToWishlist(wishlist);
    }

    @DeleteMapping
    public void removeFromWishlist(@RequestParam Long employeeId, @RequestParam Long productId) {
        wishlistService.removeFromWishlist(employeeId, productId);
    }

    @GetMapping("/exists")
    public boolean isWishlisted(@RequestParam Long employeeId, @RequestParam Long productId) {
        return wishlistService.isProductWishlisted(employeeId, productId);
    }
}
