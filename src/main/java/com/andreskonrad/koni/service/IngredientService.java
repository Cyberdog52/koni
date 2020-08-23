package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.menu.Ingredient;
import com.andreskonrad.koni.dto.menu.Product;
import com.andreskonrad.koni.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Set<Ingredient> getIngredients() {
        Set<Ingredient> products = new HashSet<>();
        ingredientRepository.findAll().forEach(products::add);
        return products;
    }

    public Ingredient create() {
        return ingredientRepository.save(new Ingredient());
    }
}
