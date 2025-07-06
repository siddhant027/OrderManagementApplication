package com.example.config;

import com.example.model.Order;
import com.example.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final OrderRepository orderRepository;

    @Override
    public void run(String... args) {

        orderRepository.deleteAll();


        List<Order> orders = List.of(
                new Order("ORD10001", "Aarav Mehta", "Kurta", LocalDate.of(2025, 1, 10), new BigDecimal("999.00"), "COMPLETED"),
                new Order("ORD10002", "Ishita Verma", "Saree", LocalDate.of(2025, 2, 15), new BigDecimal("1499.00"), "CONTINUING"),
                new Order("ORD10003", "Rajesh Kumar", "Smartphone", LocalDate.of(2025, 3, 22), new BigDecimal("15999.00"), "RESTITUTE"),
                new Order("ORD10004", "Sneha Reddy", "Wrist Watch", LocalDate.of(2025, 4, 5), new BigDecimal("2499.00"), "CANCELED"),
                new Order("ORD10005", "Karan Singh", "Laptop", LocalDate.of(2025, 5, 18), new BigDecimal("58000.00"), "COMPLETED"),
                new Order("ORD10006", "Priya Deshmukh", "Handbag", LocalDate.of(2025, 6, 1), new BigDecimal("2199.00"), "CONTINUING"),
                new Order("ORD10007", "Arjun Nair", "Bluetooth Speaker", LocalDate.of(2025, 7, 9), new BigDecimal("3499.00"), "COMPLETED"),
                new Order("ORD10008", "Neha Shah", "Anarkali Suit", LocalDate.of(2025, 8, 25), new BigDecimal("1799.00"), "RESTITUTE"),
                new Order("ORD10009", "Vikram Joshi", "Air Conditioner", LocalDate.of(2025, 9, 12), new BigDecimal("32000.00"), "CANCELED"),
                new Order("ORD10010", "Divya Pillai", "Mixer Grinder", LocalDate.of(2025, 10, 30), new BigDecimal("3200.00"), "COMPLETED")
        );

        orderRepository.saveAll(orders);
    }
}

