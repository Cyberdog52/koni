package com.andreskonrad.koni.dto.leiterli;

import java.util.Objects;

public class LeiterliField {

    private final int number;
    private final int move;
    private boolean visited;

    public LeiterliField(int number, int move) {
        this.number = number;
        this.move = move;
        this.visited = false;
    }

    public int getNumber() {
        return number;
    }

    public int getMove() {
        return move;
    }

    public void visit() {
        this.visited = true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeiterliField that = (LeiterliField) o;
        return number == that.number;
    }

    @Override
    public int hashCode() {
        return Objects.hash(number);
    }
}
