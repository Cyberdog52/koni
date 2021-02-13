package com.andreskonrad.koni.dto.flur;

import java.util.Date;

public class Observation {

    private final Date date;
    private final Double value;

    public Observation(Date date, Double value) {
        this.date = date;
        this.value = value;
    }

    public Date getDate() {
        return date;
    }

    public Double getValue() {
        return value;
    }
}
