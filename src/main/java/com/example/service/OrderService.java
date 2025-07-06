package com.example.service;

import com.example.dto.OrderFilterRequest;
import com.example.model.Order;
import com.example.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    @Autowired
    private final OrderRepository orderRepository;

    public Page<Order> filterOrders(OrderFilterRequest filterRequest) {
        List<Order> all = orderRepository.findAll();

        List<Order> filtered = all.stream()
                .filter(o -> filterRequest.getOrderId() == null || o.getOrderId().contains(filterRequest.getOrderId()))
                .filter(o -> filterRequest.getCustomer() == null || o.getCustomer().toLowerCase().contains(filterRequest.getCustomer().toLowerCase()))
                .filter(o -> filterRequest.getOrderItem() == null || o.getOrderItem().toLowerCase().contains(filterRequest.getOrderItem().toLowerCase()))
                .filter(o -> filterRequest.getStatus() == null || o.getStatus().equalsIgnoreCase(filterRequest.getStatus()))
                .filter(o -> filterRequest.getStartDate() == null || !o.getDeliveryDate().isBefore(filterRequest.getStartDate()))
                .filter(o -> filterRequest.getEndDate() == null || !o.getDeliveryDate().isAfter(filterRequest.getEndDate()))
                .filter(o -> filterRequest.getMinPrice() == null || o.getDeliveryPricing().compareTo(filterRequest.getMinPrice()) >= 0)
                .filter(o -> filterRequest.getMaxPrice() == null || o.getDeliveryPricing().compareTo(filterRequest.getMaxPrice()) <= 0)
                .collect(Collectors.toList());

        int start = filterRequest.getPage() * filterRequest.getSize();
        int end = Math.min(start + filterRequest.getSize(), filtered.size());
        List<Order> paged = filtered.subList(start, end);

        return new PageImpl<>(paged, PageRequest.of(filterRequest.getPage(), filterRequest.getSize()), filtered.size());
    }
}