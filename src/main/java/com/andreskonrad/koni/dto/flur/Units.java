package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Units {
    private String temp;
    private String wind;
    private String rain;
    private String pressure;
    private String snowline;

    // for jackson
    public Units() {
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getWind() {
        return wind;
    }

    public void setWind(String wind) {
        this.wind = wind;
    }

    public String getRain() {
        return rain;
    }

    public void setRain(String rain) {
        this.rain = rain;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public String getSnowline() {
        return snowline;
    }

    public void setSnowline(String snowline) {
        this.snowline = snowline;
    }
}