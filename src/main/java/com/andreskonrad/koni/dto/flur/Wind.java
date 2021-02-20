package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Wind {
    private String speed;
    private String symbol;
    private String symbolB;
    private String gusts;
    private String dir;

    // for jackson
    public Wind() {
    }

    public String getDir() {
        return dir;
    }

    public void setDir(String dir) {
        this.dir = dir;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbolB() {
        return symbolB;
    }

    public void setSymbolB(String symbolB) {
        this.symbolB = symbolB;
    }

    public String getGusts() {
        return gusts;
    }

    public void setGusts(String gusts) {
        this.gusts = gusts;
    }
}
