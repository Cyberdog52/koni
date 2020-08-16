package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.menu.Product;
import com.andreskonrad.koni.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public Object getProducts() {
        Set<Product> products = productService.getProducts();
        if (products == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return products;
    }

    @PostMapping("/")
    public Object create(@RequestBody String productName) {
        Product savedProduct = productService.create(productName);
        if (savedProduct == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return savedProduct;
    }
}
