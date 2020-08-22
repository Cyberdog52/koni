package com.andreskonrad.koni.dto.menu;

import javax.persistence.Column;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

@Table
public class MenuPart implements Serializable {

    @Column
    private Recipe recipe;

    @Column
    private Integer numberOfPeople;

    public MenuPart() {
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MenuPart menuPart = (MenuPart) o;
        return numberOfPeople == menuPart.numberOfPeople &&
                Objects.equals(recipe, menuPart.recipe);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipe, numberOfPeople);
    }
}
