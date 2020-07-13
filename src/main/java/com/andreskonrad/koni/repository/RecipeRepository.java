package com.andreskonrad.koni.repository;

import com.andreskonrad.koni.dto.menu.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {
}
