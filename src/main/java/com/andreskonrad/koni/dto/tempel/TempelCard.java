package com.andreskonrad.koni.dto.tempel;

import com.andreskonrad.koni.dto.Player;

public class TempelCard {


    private TempelCardType tempelCardType;

    private boolean opened;

    private Player assignedPlayer;
    public TempelCard(TempelCardType tempelCardType) {
        this.tempelCardType = tempelCardType;
        this.opened = false;
    }

    public TempelCardType getTempelCardType() {
        return tempelCardType;
    }

    public void open() {
        this.opened = true;
    }

    public boolean isOpened() {
        return opened;
    }

    public Player getAssignedPlayer() {
        return assignedPlayer;
    }

    public void setAssignedPlayer(Player assignedPlayer) {
        this.assignedPlayer = assignedPlayer;
    }
}

enum TempelCardType {
    FALLE, LEER, GOLD
}
