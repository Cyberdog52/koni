package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.menu.Ingredient;
import com.andreskonrad.koni.dto.menu.Product;
import com.andreskonrad.koni.service.IngredientService;
import com.andreskonrad.koni.service.ProductService;
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

    @PostMapping("/")
    public Object create(@RequestBody String productName) {
        Ingredient savedIngredient = ingredientService.create();
        if (savedIngredient == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return savedIngredient;
    }
}
