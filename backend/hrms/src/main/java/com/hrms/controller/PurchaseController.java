package com.hrms.controller;

import com.hrms.entity.Purchase;
import com.hrms.repository.*;
import com.hrms.dto.*;
import com.hrms.entity.*;
import java.util.stream.Collectors;


import com.hrms.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.savePurchase(purchase);
    }

   
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<PurchaseViewDTO> getAllPurchasesWithNames() {
        List<Purchase> purchases = purchaseRepository.findAll();

        return purchases.stream().map(purchase -> {
            String employeeName = employeeRepository.findById(purchase.getEmployeeId())
                .map(Employee::getName).orElse("Unknown");

            String productName = productRepository.findById(purchase.getProductId())
                .map(Product::getName).orElse("Unknown");

            return new PurchaseViewDTO(
                employeeName,
                productName,
                purchase.getQuantity(),
                purchase.getTotalAmount(),
                purchase.getStatus(),
                purchase.getPurchaseDate().toString()
            );
        }).collect(Collectors.toList());
    }

    @GetMapping("/employee/{employeeId}")
    public List<Purchase> getByEmployee(@PathVariable Long employeeId) {
        return purchaseService.getPurchasesByEmployeeId(employeeId);
    }

    @PutMapping("/{id}/status")
    public Purchase updateStatus(@PathVariable Long id, @RequestParam String status) {
        return purchaseService.updatePurchaseStatus(id, status);
    }
}

