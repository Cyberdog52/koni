package com.andreskonrad.koni.dto.menu;

import org.javatuples.Quartet;
import org.javatuples.Triplet;

import javax.persistence.Table;
import javax.persistence.Tuple;
import java.io.Serializable;
import java.util.*;

@Table
public class Amount implements Serializable {

    private AmountSize amountSize;
    private double value;

    public Amount() {
    }

    public Amount(AmountSize amountSize, double value) {
        this.amountSize = amountSize;
        this.value = value;
    }

    public static Amount combine(List<Amount> amounts) {
        Map<AmountSize, Double> amountSizeValueMap = new HashMap<>();
        for (Amount amount : amounts) {
            if (amountSizeValueMap.containsKey(amount.amountSize)) {
                Double previousValue = amountSizeValueMap.get(amount.amountSize);
                amountSizeValueMap.put(amount.amountSize, previousValue + amount.value);

            } else {
                amountSizeValueMap.put(amount.amountSize, amount.value);
            }
        }
        while (amountSizeValueMap.size() > 1) {
            List<AmountSize> amountSizes = new ArrayList<>(amountSizeValueMap.keySet());
            AmountSize firstAmountSize = amountSizes.get(0);
            AmountSize otherAmountSize = amountSizes.get(1);
            Amount newAmount = Amount.merge(new Amount(firstAmountSize, amountSizeValueMap.get(firstAmountSize)), new Amount(otherAmountSize, amountSizeValueMap.get(otherAmountSize)), false);
            amountSizeValueMap.remove(firstAmountSize);
            amountSizeValueMap.remove(otherAmountSize);
            amountSizeValueMap.put(newAmount.amountSize, newAmount.value);
        }

        List<AmountSize> amountSizes = new ArrayList<>(amountSizeValueMap.keySet());
        return new Amount(amountSizes.get(0), amountSizeValueMap.get(amountSizes.get(0)));
    }

    public static List<Quartet<AmountSize, AmountSize, Double, AmountSize>> getConversionQuartets() {
        ArrayList<Quartet<AmountSize, AmountSize, Double, AmountSize>> conversionQuartets = new ArrayList<>();
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.L, 1.0, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.DL, 0.1, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.G, 0.001, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.EL, 0.01, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.TL, 0.003, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.KL, 0.0015, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.LITTLE, 0.01, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.ALOT, 0.02, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.DEMAND, 0.01, AmountSize.KG));
        conversionQuartets.add(new Quartet<>(AmountSize.KG, AmountSize.UNDEFINED, 0.01, AmountSize.KG));

        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.DL, 0.1, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.G, 0.001, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.EL, 0.01, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.TL, 0.003, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.KL, 0.0015, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.LITTLE, 0.01, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.ALOT, 0.02, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.DEMAND, 0.01, AmountSize.L));
        conversionQuartets.add(new Quartet<>(AmountSize.L, AmountSize.UNDEFINED, 0.01, AmountSize.L));

        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.G, 0.01, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.EL, 0.1, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.TL, 0.03, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.KL, 0.015, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.LITTLE, 0.1, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.ALOT, 0.2, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.DEMAND, 0.1, AmountSize.DL));
        conversionQuartets.add(new Quartet<>(AmountSize.DL, AmountSize.UNDEFINED, 0.1, AmountSize.DL));

        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.EL, 10.0, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.TL, 3.0, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.KL, 1.5, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.LITTLE, 1.0, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.ALOT, 2.0, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.DEMAND, 1.0, AmountSize.G));
        conversionQuartets.add(new Quartet<>(AmountSize.G, AmountSize.UNDEFINED, 1.0, AmountSize.G));

        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.TL, 0.3, AmountSize.EL));
        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.KL, 0.15, AmountSize.EL));
        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.LITTLE, 0.5, AmountSize.EL));
        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.ALOT, 1.0, AmountSize.EL));
        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.DEMAND, 0.5, AmountSize.EL));
        conversionQuartets.add(new Quartet<>(AmountSize.EL, AmountSize.UNDEFINED, 0.5, AmountSize.EL));

        conversionQuartets.add(new Quartet<>(AmountSize.TL, AmountSize.KL, 0.5, AmountSize.TL));
        conversionQuartets.add(new Quartet<>(AmountSize.TL, AmountSize.LITTLE, 0.5, AmountSize.TL));
        conversionQuartets.add(new Quartet<>(AmountSize.TL, AmountSize.ALOT, 1.0, AmountSize.TL));
        conversionQuartets.add(new Quartet<>(AmountSize.TL, AmountSize.DEMAND, 0.5, AmountSize.TL));
        conversionQuartets.add(new Quartet<>(AmountSize.TL, AmountSize.UNDEFINED, 0.5, AmountSize.TL));

        conversionQuartets.add(new Quartet<>(AmountSize.LITTLE, AmountSize.ALOT, 2.0, AmountSize.LITTLE));
        conversionQuartets.add(new Quartet<>(AmountSize.LITTLE, AmountSize.DEMAND, 1.0, AmountSize.LITTLE));
        conversionQuartets.add(new Quartet<>(AmountSize.LITTLE, AmountSize.UNDEFINED, 1.0, AmountSize.LITTLE));

        conversionQuartets.add(new Quartet<>(AmountSize.ALOT, AmountSize.DEMAND, 0.5, AmountSize.ALOT));
        conversionQuartets.add(new Quartet<>(AmountSize.ALOT, AmountSize.UNDEFINED, 1.0, AmountSize.ALOT));

        conversionQuartets.add(new Quartet<>(AmountSize.DEMAND, AmountSize.UNDEFINED, 1.0, AmountSize.DEMAND));

        return conversionQuartets;
    }

    public static Amount merge(Amount amount0, Amount amount1, boolean repeated) {
        if (amount0.amountSize == amount1.amountSize) {
            return new Amount(amount0.amountSize, amount0.value + amount1.value);
        }
        for (Quartet<AmountSize, AmountSize, Double, AmountSize> conversionQuartet : getConversionQuartets()) {
            if (amount0.amountSize == conversionQuartet.getValue0() && amount1.amountSize == conversionQuartet.getValue1()) {
                return new Amount(conversionQuartet.getValue3(), amount0.value + conversionQuartet.getValue2() * amount1.value);
            }
        }
        if (repeated) {
            return new Amount(AmountSize.UNDEFINED, 2);
        }
        return Amount.merge(amount1, amount0, true);
    }

    public AmountSize getAmountSize() {
        return amountSize;
    }

    public void setAmountSize(AmountSize amountSize) {
        this.amountSize = amountSize;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public enum AmountType {
        WATER, PIECE, SPOON, WEIGHT, UNDEFINED
    }

    public enum AmountSize {
        KG, L, DL, G, EL, TL, KL, PIECE, LITTLE, ALOT, DEMAND, UNDEFINED;
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
