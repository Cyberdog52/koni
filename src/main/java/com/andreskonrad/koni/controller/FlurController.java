package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.flur.Weather;
import com.andreskonrad.koni.dto.flur.WeatherReport;
import com.andreskonrad.koni.dto.flur.Observation;
import com.andreskonrad.koni.service.FlurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/flur/")
public class FlurController {

    private FlurService flurService;

    @Autowired
    public FlurController(FlurService flurService) {
        this.flurService = flurService;
    }

    @GetMapping("discharge")
    public ResponseEntity<List<Observation>> getDischarge() {
        List<Observation> observations;
        try {
            observations = this.flurService.getDischargeObservations();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(observations, HttpStatus.OK);
    }

    @GetMapping("level")
    public ResponseEntity<List<Observation>> getLevel() {
        List<Observation> observations;
        try {
            observations = this.flurService.getLevelObservations();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(observations, HttpStatus.OK);
    }

    @GetMapping("temperature")
    public ResponseEntity<List<Observation>> getTemperature() {
        List<Observation> observations;
        try {
            observations = this.flurService.getTemparatureObservations();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(observations, HttpStatus.OK);
    }

    @GetMapping("weatherReport")
    public ResponseEntity<WeatherReport> getWeatherReport() {
        WeatherReport weather;
        try {
            weather = this.flurService.getWeatherReport();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(weather, HttpStatus.OK);
    }

    @GetMapping("weather")
    public ResponseEntity<Weather> getWeather() {
        Weather weather;
        try {
            weather = this.flurService.getWeather();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(weather, HttpStatus.OK);
    }
}
