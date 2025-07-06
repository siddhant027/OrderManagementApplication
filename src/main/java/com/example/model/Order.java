package com.example.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document("orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    private String orderId;
    private String customer;
    private String orderItem;
    private LocalDate deliveryDate;
    private BigDecimal deliveryPricing;
    private String status;
}