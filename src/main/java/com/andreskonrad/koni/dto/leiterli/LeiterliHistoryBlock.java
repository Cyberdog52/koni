package com.andreskonrad.koni.dto.leiterli;

import com.andreskonrad.koni.dto.Player;

import java.util.Objects;

public class LeiterliHistoryBlock {

    private final Player player;
    private final int roll;
    private final LeiterliField previousField;
    private final LeiterliField currentField;

    public LeiterliHistoryBlock(Player player, int roll, LeiterliField previousField, LeiterliField currentField) {
        this.player = player;
        this.roll = roll;
        this.previousField = previousField;
        this.currentField = currentField;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LeiterliHistoryBlock that = (LeiterliHistoryBlock) o;
        return roll == that.roll &&
                Objects.equals(player, that.player) &&
                Objects.equals(previousField, that.previousField) &&
                Objects.equals(currentField, that.currentField);
    }

    @Override
    public int hashCode() {
        return Objects.hash(player, roll, previousField, currentField);
    }
}
