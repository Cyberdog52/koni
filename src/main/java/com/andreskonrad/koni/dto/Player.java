package com.andreskonrad.koni.dto;

import java.util.Objects;

public class Player {

    private final String name;

    private PlayerState state;

    Player(String name) {
        this.name = name;
        this.state = PlayerState.JOINED;
    }

    public String getName() {
        return name;
    }

    public PlayerState getState() {
        return state;
    }

    public void setState(PlayerState state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(name, player.name) &&
                state == player.state;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, state);
    }
}

enum PlayerState {
    JOINED, PLAYING, FINISHED, MASON
}
