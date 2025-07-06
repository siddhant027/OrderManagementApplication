package com.example.controller;

import com.example.dto.OrderFilterRequest;
import com.example.model.Order;
import com.example.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/filter")
    public Page<Order> filterOrders(@RequestBody OrderFilterRequest filterRequest) {
        return orderService.filterOrders(filterRequest);
    }
}