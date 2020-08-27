package com.andreskonrad.koni.controller;


import com.andreskonrad.koni.dto.menu.Recipe;
import com.andreskonrad.koni.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/ids")
    public Object getIds() {
        List<Long> recipeIds = recipeService.getIds();
        if (recipeIds == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return recipeIds;
    }

    @GetMapping("/{id}")
    public Object get(@PathVariable("id") Long id) {
        Recipe recipe = recipeService.get(id);
        if (recipe == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    @PostMapping("/{id}")
    public Object save(@PathVariable("id") Long id, @RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeService.save(recipe);
        if (savedRecipe == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return savedRecipe;
    }

    @GetMapping("/")
    public Object create() {
        Recipe recipe = recipeService.create();
        if (recipe == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return recipe;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        recipeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/ingredients/{numberOfPeople}")
    public Object getIngredients(@PathVariable("id") Long id, @PathVariable("numberOfPeople") Integer numberOfPeople) {
        Recipe recipe = recipeService.get(id);

        if (recipe == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return recipe.calculateIngredients(numberOfPeople);
    }
}
