package com.andreskonrad.koni.dto.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table
public class Ingredient implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Product product;

    @Column
    private Amount amount;

    @Transient
    private List<String> recipeNames;

    //for jpa and json deserialization

    public Ingredient() {
    }
    public Ingredient(Product product, Amount amount, List<String> recipeNames) {
        this.product = product;
        this.amount = amount;
        this.recipeNames = recipeNames;
    }

    @JsonIgnore
    public void adjustSize() {
        if (this.amount == null || this.amount.getAmountSize() == null) {
            return;
        }
        if (this.amount.getAmountSize() == Amount.AmountSize.KL && this.amount.getValue() > 2) {
            this.amount.setAmountSize(Amount.AmountSize.TL);
            this.amount.setValue(this.amount.getValue() / 2.0);
        }
        if (this.amount.getAmountSize() == Amount.AmountSize.TL && this.amount.getValue() > 3) {
            this.amount.setAmountSize(Amount.AmountSize.EL);
            this.amount.setValue(this.amount.getValue() / 3.0);
        }
        if (this.amount.getAmountSize() == Amount.AmountSize.EL && this.amount.getValue() > 10) {
            this.amount.setAmountSize(Amount.AmountSize.G);
            this.amount.setValue(this.amount.getValue() * 10.0);
        }
        if (this.amount.getAmountSize() == Amount.AmountSize.G && this.amount.getValue() > 1000) {
            this.amount.setAmountSize(Amount.AmountSize.KG);
            this.amount.setValue(this.amount.getValue() / 1000.0);
        }
        if (this.amount.getAmountSize() == Amount.AmountSize.DL && this.amount.getValue() > 10) {
            this.amount.setAmountSize(Amount.AmountSize.L);
            this.amount.setValue(this.amount.getValue() / 10.0);
        }

    }


    @JsonIgnore
    public void round() {
        if (this.amount != null) this.amount.setValue((double) Math.round(this.amount.getValue() * 10) / 10);
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Amount getAmount() {
        return amount;
    }

    public void setAmount(Amount amount) {
        this.amount = amount;
    }

    public List<String> getRecipeNames() {
        return recipeNames;
    }

    public void setRecipeNames(List<String> recipeNames) {
        this.recipeNames = recipeNames;
    }

    @JsonIgnore
    public static List<Ingredient> merge(List<Ingredient> ingredients) {
        List<Ingredient> mergedIngredients = new ArrayList<>();
        Map<Product, List<Ingredient>> productToIngredientsMap = new HashMap<>();
        for (Ingredient ingredient : ingredients) {
            if (productToIngredientsMap.containsKey(ingredient.product)) {
                List<Ingredient> previousIngredientList = productToIngredientsMap.get(ingredient.product);
                previousIngredientList.add(ingredient);
                productToIngredientsMap.put(ingredient.product, previousIngredientList);
            } else {
                ArrayList<Ingredient> newIngredientList = new ArrayList<>();
                newIngredientList.add(ingredient);
                productToIngredientsMap.put(ingredient.product, newIngredientList);
            }
        }

        for (Product product: productToIngredientsMap.keySet()) {
            List<Amount> amounts = productToIngredientsMap.get(product).stream()
                    .map(ingredient -> ingredient.amount)
                    .collect(Collectors.toList());
            List<String> recipeNames = productToIngredientsMap.get(product).stream()
                    .map(ingredient -> ingredient.recipeNames)
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());

            Amount combinedAmount = Amount.combine(amounts);
            mergedIngredients.add(new Ingredient(product, combinedAmount, recipeNames));
        }

        return mergedIngredients;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void addRecipeName(String title) {
        if (this.recipeNames == null) {
            this.recipeNames = new ArrayList<>();
        }
        if (!this.recipeNames.contains(title)) {
            this.recipeNames.add(title);
        }
    }
}
