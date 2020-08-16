package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.menu.Product;
import com.andreskonrad.koni.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Set<Product> getProducts() {
        Set<Product> products = new HashSet<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }

    public Product create(String productName) {
        return productRepository.save(new Product(productName));
    }
}
