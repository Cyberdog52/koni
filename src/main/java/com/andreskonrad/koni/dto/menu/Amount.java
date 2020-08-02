package com.andreskonrad.koni.dto.menu;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class Amount implements Serializable {

    private AmountSize amountSize;
    private int value;

    public enum AmountType {
        WATER, PIECE, SPOON, WEIGHT, UNDEFINED
    }

    public enum AmountSize {
        G, KG, DL, TL, EL, L, PIECE, UNDEFINED, LITTLE, DEMAND;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Amount amount = (Amount) o;
        return value == amount.value &&
                amountSize == amount.amountSize;
    }

    @Override
    public int hashCode() {
        return Objects.hash(amountSize, value);
    }
}
