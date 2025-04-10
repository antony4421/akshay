package com.hrms.service;

import com.hrms.entity.Purchase;
import com.hrms.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    public Purchase savePurchase(Purchase purchase) {
        purchase.setPurchaseDate(LocalDateTime.now());
        if (purchase.getStatus() == null || purchase.getStatus().isEmpty()) {
            purchase.setStatus("Pending");
        }
        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public List<Purchase> getPurchasesByEmployeeId(Long employeeId) {
        return purchaseRepository.findByEmployeeId(employeeId);
    }

    public Purchase updatePurchaseStatus(Long id, String status) {
        Purchase purchase = purchaseRepository.findById(id).orElse(null);
        if (purchase != null) {
            purchase.setStatus(status);
            return purchaseRepository.save(purchase);
        }
        return null;
    }
}

