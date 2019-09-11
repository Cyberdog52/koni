package com.andreskonrad.koni.dto.leiterli;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class LeiterliBoard {

    private final Set<LeiterliField> fields;

    public LeiterliBoard(Set<LeiterliField> fields) {
        this.fields = fields;
    }

    private LeiterliField getField(int number) {
        return fields.stream().
                filter(leiterliField -> leiterliField.getNumber()==number).
                findFirst().
                get();
    }

    public LeiterliBoard(int maxFields) {
        Set<LeiterliField> fields = new HashSet<>();
        for (int i = 1; i <= maxFields; i++) {
            //TODO add random moves
            LeiterliField newField = new LeiterliField(i, 0);
            fields.add(newField);
        }
        this.fields = fields;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeiterliBoard that = (LeiterliBoard) o;
        return Objects.equals(fields, that.fields);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fields);
    }

    public LeiterliField move(LeiterliField previousField, int roll) {
        LeiterliField firstField = getField(previousField.getNumber() + roll);
        firstField.visit();
        return getField(firstField.getNumber() + firstField.getMove());
    }
}
