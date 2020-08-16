package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table
public class Ingredient implements Serializable {

    @Column
    private Product product;

    @Column
    private Amount amount;

    //for jpa and json deserialization
    public Ingredient() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return Objects.equals(product, that.product) &&
                Objects.equals(amount, that.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(product, amount);
    }
}
