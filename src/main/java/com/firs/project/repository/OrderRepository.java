package com.firs.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firs.project.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
