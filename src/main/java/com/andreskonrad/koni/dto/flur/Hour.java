package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Hour {
    private String interval;
    private String temp;
    private String symbol_value;
    private String symbol_description;
    private String symbol_value2;
    private String symbol_description2;
    private Wind wind;
    private String rain;
    private String humidity;
    private String pressure;
    private String clouds;
    private String snowline;
    private String windchill;
    private String uv_index;

    // for jackson
    public Hour() {
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getSymbol_value() {
        return symbol_value;
    }

    public void setSymbol_value(String symbol_value) {
        this.symbol_value = symbol_value;
    }

    public String getSymbol_description() {
        return symbol_description;
    }

    public void setSymbol_description(String symbol_description) {
        this.symbol_description = symbol_description;
    }

    public String getSymbol_value2() {
        return symbol_value2;
    }

    public void setSymbol_value2(String symbol_value2) {
        this.symbol_value2 = symbol_value2;
    }

    public String getSymbol_description2() {
        return symbol_description2;
    }

    public void setSymbol_description2(String symbol_description2) {
        this.symbol_description2 = symbol_description2;
    }

    public Wind getWind() {
        return wind;
    }

    public void setWind(Wind wind) {
        this.wind = wind;
    }

    public String getRain() {
        return rain;
    }

    public void setRain(String rain) {
        this.rain = rain;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public String getClouds() {
        return clouds;
    }

    public void setClouds(String clouds) {
        this.clouds = clouds;
    }

    public String getSnowline() {
        return snowline;
    }

    public void setSnowline(String snowline) {
        this.snowline = snowline;
    }

    public String getWindchill() {
        return windchill;
    }

    public void setWindchill(String windchill) {
        this.windchill = windchill;
    }

    public String getUv_index() {
        return uv_index;
    }

    public void setUv_index(String uv_index) {
        this.uv_index = uv_index;
    }
}