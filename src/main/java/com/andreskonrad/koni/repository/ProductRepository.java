package com.andreskonrad.koni.repository;

import com.andreskonrad.koni.dto.menu.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
}
