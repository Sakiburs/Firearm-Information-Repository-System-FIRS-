package com.firs.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.firs.project.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
