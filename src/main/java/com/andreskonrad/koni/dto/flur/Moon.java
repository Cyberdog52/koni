package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Moon {
    private String in ;
    private String out;
    private String lumi;
    private String desc;
    private String symbol;

    // for jackson
    public Moon() {
    }

    public String getIn() {
        return in;
    }

    public void setIn(String in) {
        this.in = in;
    }

    public String getOut() {
        return out;
    }

    public void setOut(String out) {
        this.out = out;
    }

    public String getLumi() {
        return lumi;
    }

    public void setLumi(String lumi) {
        this.lumi = lumi;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
