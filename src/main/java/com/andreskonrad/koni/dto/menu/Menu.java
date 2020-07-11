package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Entity
@Table
public class Menu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ElementCollection
    private Map<Recipe, Integer> recipeMap = new HashMap<>();

    //for jpa and json deserialization
    public Menu() {}


    public void addRecipeOrChangeAmount(Recipe recipe, Integer amount) {
        recipeMap.put(recipe, amount);
    }

    public void removeRecipe(Recipe recipe) {
        recipeMap.remove(recipe);
    }

    public Map<Recipe, Integer> getRecipeMap() {
        return recipeMap;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return id == menu.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Long getId() {
        return id;
    }
}
