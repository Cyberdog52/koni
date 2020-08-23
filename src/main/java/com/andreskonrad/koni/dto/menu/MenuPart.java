package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table
public class MenuPart implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
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
        return numberOfPeople.equals(menuPart.numberOfPeople) &&
                Objects.equals(recipe, menuPart.recipe);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipe, numberOfPeople);
    }
}
