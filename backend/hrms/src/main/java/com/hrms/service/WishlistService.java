package com.hrms.service;

import com.hrms.entity.Wishlist;
import com.hrms.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<Wishlist> getWishlistByEmployeeId(Long employeeId) {
        return wishlistRepository.findByEmployeeId(employeeId);
    }

    public Wishlist addToWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void removeFromWishlist(Long employeeId, Long productId) {
        wishlistRepository.deleteByEmployeeIdAndProductId(employeeId, productId);
    }

    public boolean isProductWishlisted(Long employeeId, Long productId) {
        return wishlistRepository.findByEmployeeIdAndProductId(employeeId, productId).isPresent();
    }
}
