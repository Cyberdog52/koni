package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Day {
    private String date;
    private String name;
    private String month;
    private String symbol_value;
    private String symbol_description;
    private String symbol_value2;
    private String symbol_description2;
    private String tempmin;
    private String tempmax;
    private Wind wind;
    private String rain;
    private String humidity;
    private String pressure;
    private String snowline;
    private String uv_index_max;
    private Sun sun;
    private Moon moon;
    private Units units;
    private String local_time;
    private float local_time_offset;
    private List<Hour> hour;

    // for jackson
    public Day() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
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

    public String getTempmin() {
        return tempmin;
    }

    public void setTempmin(String tempmin) {
        this.tempmin = tempmin;
    }

    public String getTempmax() {
        return tempmax;
    }

    public void setTempmax(String tempmax) {
        this.tempmax = tempmax;
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

    public String getSnowline() {
        return snowline;
    }

    public void setSnowline(String snowline) {
        this.snowline = snowline;
    }

    public String getUv_index_max() {
        return uv_index_max;
    }

    public void setUv_index_max(String uv_index_max) {
        this.uv_index_max = uv_index_max;
    }

    public Sun getSun() {
        return sun;
    }

    public void setSun(Sun sun) {
        this.sun = sun;
    }

    public Moon getMoon() {
        return moon;
    }

    public void setMoon(Moon moon) {
        this.moon = moon;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public String getLocal_time() {
        return local_time;
    }

    public void setLocal_time(String local_time) {
        this.local_time = local_time;
    }

    public float getLocal_time_offset() {
        return local_time_offset;
    }

    public void setLocal_time_offset(float local_time_offset) {
        this.local_time_offset = local_time_offset;
    }

    public List<Hour> getHour() {
        return hour;
    }

    public void setHour(List<Hour> hour) {
        this.hour = hour;
    }
}
