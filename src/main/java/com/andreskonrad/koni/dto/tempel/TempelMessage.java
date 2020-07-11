package com.andreskonrad.koni.dto.tempel;

import java.util.Objects;

public class TempelMessage {

    private final int id;
    private final String message;
    private final TempelCardType openedCardType;

    public TempelMessage(int id, String message) {
        this.id = id;
        this.message = message;
        openedCardType = null;
    }

    public TempelMessage(int id, String message, TempelCardType cardType) {
        this.id = id;
        this.message = message;
        this.openedCardType = cardType;
    }

    public int getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public TempelCardType getOpenedCardType() {
        return openedCardType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TempelMessage that = (TempelMessage) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

