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

    @ElementCollection
    private Map<Long, Amount> ingredientIdMap = new HashMap<>();

    @ElementCollection
    private List<String> steps = new ArrayList<>();

    public Recipe() {
    }

    public String getTitle() {
        return title;
    }

    public Map<Long, Amount> getIngredientIdMap() {
        return ingredientIdMap;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIngredientIdMap(Map<Long, Amount> ingredientMap) {
        this.ingredientIdMap = ingredientMap;
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
                Objects.equals(ingredientIdMap, recipe.ingredientIdMap) &&
                Objects.equals(steps, recipe.steps);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, ingredientIdMap, steps);
    }

    public Long getId() {
        return this.id;
    }
}
