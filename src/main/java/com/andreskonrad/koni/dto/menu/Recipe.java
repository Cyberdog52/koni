package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table
public class Recipe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String title = "Neues Rezept";

    @Embedded
    @ElementCollection
    private Map<Ingredient, Amount> ingredientMap = new HashMap<>();

    @ElementCollection
    private List<String> steps = new ArrayList<>();

    public Recipe() {
    }

    public String getTitle() {
        return title;
    }

    public Map<Ingredient, Amount> getIngredientMap() {
        return ingredientMap;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIngredientMap(Map<Ingredient, Amount> ingredientMap) {
        this.ingredientMap = ingredientMap;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return Objects.equals(title, recipe.title) &&
                Objects.equals(ingredientMap, recipe.ingredientMap) &&
                Objects.equals(steps, recipe.steps);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, ingredientMap, steps);
    }
}
