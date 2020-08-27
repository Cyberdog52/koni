package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Entity
@Table
public class Menu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    private List<MenuPart> menuParts = new ArrayList<>();

    //for jpa and json deserialization
    public Menu() {
    }

    public List<MenuPart> getMenuParts() {
        return menuParts;
    }

    public void setMenuParts(List<MenuPart> menuParts) {
        this.menuParts = menuParts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Ingredient> calculateIngredients() {
        List<Ingredient> ingredients = new ArrayList<>();
        for (MenuPart menuPart: this.menuParts) {
            Recipe recipe = menuPart.getRecipe();
            //calculate the number of people for this menuPart
            ingredients.addAll(recipe.calculateIngredients(menuPart.getNumberOfPeople()));
        }

        List<Ingredient> mergedIngredients = Ingredient.merge(ingredients);

        for (Ingredient i : mergedIngredients) {
           i.adjustSize();
           i.round();
        }

        mergedIngredients.sort((i1, i2) -> i1.getProduct().getName().compareToIgnoreCase(i2.getProduct().getName()));
        return mergedIngredients;
    }
}
