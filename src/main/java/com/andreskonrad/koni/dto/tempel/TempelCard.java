package com.andreskonrad.koni.dto.tempel;

import com.andreskonrad.koni.dto.Player;

public class TempelCard {

    private static int idCounter = 0;
    private final int id;
    private TempelCardType tempelCardType;

    private boolean opened;

    private Player assignedPlayer;
    public TempelCard(TempelCardType tempelCardType) {
        this.id = idCounter;
        idCounter++;
        this.tempelCardType = tempelCardType;
        this.opened = false;
    }

    public int getId() {
        return id;
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
    FALLE, LEER, GOLD;

    static String getName(TempelCardType type) {
        switch (type) {

            case FALLE: return "Falle";
            case LEER: return "Leere Schatzkammer";
            case GOLD: return "Schatzkammer mit Gold";
        }
        return "";
    }
}
