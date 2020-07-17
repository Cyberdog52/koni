package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.menu.Ingredient;
import com.andreskonrad.koni.dto.menu.Recipe;
import com.andreskonrad.koni.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/")
    public Object getIngredients() {
        Set<Ingredient> ingredients = ingredientService.getIngredients();
        if (ingredients == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return ingredients;
    }

    @PostMapping("/")
    public Object create(@RequestBody String ingredientName) {
        Ingredient savedIngredient = ingredientService.create(ingredientName);
        if (savedIngredient == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return savedIngredient;
    }
}
