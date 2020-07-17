package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.menu.Ingredient;
import com.andreskonrad.koni.repository.IngredientRepository;
import com.andreskonrad.koni.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Set<Ingredient> getIngredients() {
        Set<Ingredient> ingredients = new HashSet<>();
        ingredientRepository.findAll().forEach(ingredients::add);
        return ingredients;
    }

    public Ingredient create(String ingredientName) {
        return ingredientRepository.save(new Ingredient(ingredientName));
    }
}
