package com.andreskonrad.koni.repository;

import com.andreskonrad.koni.dto.menu.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
}
