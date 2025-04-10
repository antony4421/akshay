package com.hrms.dto;


 // replace with your actual package name

public class PurchaseViewDTO {
    private String employeeName;
    private String productName;
    private int quantity;
    private double totalAmount;
    private String status;
    private String purchaseDate;

    public PurchaseViewDTO() {
    }

    public PurchaseViewDTO(String employeeName, String productName, int quantity, double totalAmount, String status, String purchaseDate) {
        this.employeeName = employeeName;
        this.productName = productName;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.status = status;
        this.purchaseDate = purchaseDate;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
