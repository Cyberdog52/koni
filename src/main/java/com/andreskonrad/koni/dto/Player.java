package com.andreskonrad.koni.dto;

import java.util.Objects;

public class Player {

    private final Identity identity;

    private PlayerState state;

    Player(Identity identity) {
        this.identity = identity;
        this.state = PlayerState.JOINED;
    }

    public String getName() {
        return identity.getName();
    }

    public Identity getIdentity() {
        return identity;
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
        return Objects.equals(identity, player.identity) &&
                state == player.state;
    }

    @Override
    public int hashCode() {
        return Objects.hash(identity, state);
    }
}

enum PlayerState {
    JOINED, PLAYING, FINISHED, MASON
}
