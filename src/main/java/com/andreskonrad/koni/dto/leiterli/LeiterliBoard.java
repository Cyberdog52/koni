package com.andreskonrad.koni.dto.leiterli;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class LeiterliBoard {

    private final Set<LeiterliField> fields;
    private int maxFields;

    public LeiterliField getField(int number) {
        int numberNotHigherThanMaxFields = number;
        if (number > this.maxFields) {
            numberNotHigherThanMaxFields = this.maxFields;
        }
        int finalNumberNotHigherThanMaxFields = numberNotHigherThanMaxFields;
        return fields.stream().
                filter(leiterliField -> leiterliField.getNumber()== finalNumberNotHigherThanMaxFields).
                findFirst().
                get();
    }

    private int getRandomElement(List<Integer> list) {
        return list.get(ThreadLocalRandom.current()
                .nextInt(list.size()));
    }

    public LeiterliBoard(int maxFields) {
        this.maxFields = maxFields;
        Set<LeiterliField> fields = new HashSet<>();
        for (int i = 1; i <= maxFields; i++) {
            int move = calculateMove(maxFields, i);
            LeiterliField newField = new LeiterliField(i, move);
            if (newField.getNumber() == 1) {
                newField.visit();
            }
            fields.add(newField);
        }
        this.fields = fields;
    }

    private int calculateMove(int maxFields, int fieldNumber) {
        double moveD = (new Random().nextGaussian() * getRandomElement(Arrays.asList(0,0,0,5,5,10,10,20)));
        int move = (int) moveD;
        if (move > maxFields || move * -1 > maxFields ) {
            move = 0;
        }
        if (fieldNumber + move < 1) {
            move = move * -1;
        }
        if (fieldNumber + move > maxFields) {
            move = move * -1;
        }
        if (fieldNumber == maxFields) {
            move = 0;
        }
        return move;
    }

    public Set<LeiterliField> getFields() {
        return fields;
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

    public LeiterliField move(int previousNumber, int roll) {
        LeiterliField firstField = getField(previousNumber + roll);
        firstField.visit();
        return getField(firstField.getNumber() + firstField.getMove());
    }
}
