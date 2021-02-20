package com.andreskonrad.koni.dto.flur;

import java.util.List;

public class Weather {

    private final Double temperature;
    private final Double rain;
    private final Double wind;
    private final WeatherType weatherType;
    private final List<Observation> temperatureObservations;
    private final List<Observation> rainObservations;
    private final List<Observation> windObservations;

    public Weather(Double temperature, Double rain, Double wind, WeatherType weatherType, List<Observation> temperatureObservations, List<Observation> rainObservations, List<Observation> windObservations) {
        this.temperature = temperature;
        this.rain = rain;
        this.wind = wind;
        this.weatherType = weatherType;
        this.temperatureObservations = temperatureObservations;
        this.rainObservations = rainObservations;
        this.windObservations = windObservations;
    }

    public Double getTemperature() {
        return temperature;
    }

    public WeatherType getWeatherType() {
        return weatherType;
    }

    public List<Observation> getTemperatureObservations() {
        return temperatureObservations;
    }

    public List<Observation> getRainObservations() {
        return rainObservations;
    }

    public List<Observation> getWindObservations() {
        return windObservations;
    }

    public Double getRain() {
        return rain;
    }

    public Double getWind() {
        return wind;
    }
}


