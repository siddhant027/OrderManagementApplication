package com.example.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class OrderFilterRequest {
    private String orderId;
    private String customer;
    private String orderItem;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String status;
    private int page = 0;
    private int size = 10;
}