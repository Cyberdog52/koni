package com.andreskonrad.koni.dto.flur;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherReport {
    private float status;
    private String location;
    private String url;
    private Map<String, Day> day;

    // for jackson
    public WeatherReport() {
    }

    public WeatherReport(float status, String location, String url, Map<String, Day> day) {
        this.status = status;
        this.location = location;
        this.url = url;
        this.day = day;
    }

    public float getStatus() {
        return status;
    }

    public void setStatus(float status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, Day> getDay() {
        return day;
    }

    public void setDay(Map<String, Day> day) {
        this.day = day;
    }

    public List<Day> getSortedDays() {
        return getDay().keySet()
                .stream()
                .sorted(Comparator.comparingInt(Integer::parseInt))
                .map(getDay()::get).collect(Collectors.toList());
    }

    public Day getToday() {
        try {
            return getDay().get("1");
        } catch (NullPointerException e) {
            return null;
        }
    }
}
