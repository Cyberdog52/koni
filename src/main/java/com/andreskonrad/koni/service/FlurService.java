package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.flur.Weather;
import com.andreskonrad.koni.dto.flur.WeatherReport;
import com.andreskonrad.koni.dto.flur.Observation;
import com.andreskonrad.koni.dto.flur.WeatherReportToWeatherMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FlurService {

    private int stationId = 2243;

    private static final String BASE_URL ="https://www.hydrodaten.admin.ch/lhg/az/dwh/csv/BAFU_";
    private static final String WEATHER_URL = "http://api.daswetter.com/index.php?api_lang=de&localidad=189278&affiliate_id=yfb5k649eqof&v=3.0";

    public List<Observation> getDischargeObservations() {
        String uri = BASE_URL + stationId + "_AbflussRadarBruecke.csv";
        RestTemplate restTemplate = new RestTemplate();
        String csvContent = restTemplate.getForObject(uri, String.class);

        return convertCsvToObservationList(csvContent);
    }

    public List<Observation> getTemparatureObservations() {

        String uri = BASE_URL + stationId + "_Wassertemperatur.csv";
        RestTemplate restTemplate = new RestTemplate();
        String csvContent = restTemplate.getForObject(uri, String.class);

        return convertCsvToObservationList(csvContent);
    }

    public List<Observation> getLevelObservations() {
        String uri = BASE_URL + stationId +  "_PegelRadarBruecke.csv";
        RestTemplate restTemplate = new RestTemplate();
        String csvContent = restTemplate.getForObject(uri, String.class);;

        return convertCsvToObservationList(csvContent);
    }

    private static List<Observation> convertCsvToObservationList(String csvContent) {
        if (csvContent == null) {
            return new ArrayList<>();
        }

        ArrayList<Observation> observations = new ArrayList<>();
        String[] rows = csvContent.split("\n");
        for (String row : rows) {
            String[] rowElements = row.split(",");
            if (rowElements.length != 2) {
                continue;
            }
            SimpleDateFormat format =
                    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");

            try {
                Date date = format.parse(rowElements[0]);
                Double value = Double.parseDouble(rowElements[1]);
                observations.add(new Observation(date, value));
            } catch (ParseException ignored) {
            }
        }
        return observations;
    }

    public WeatherReport getWeatherReport() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(new URI(WEATHER_URL))
                    .build();
            String response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString()).body();
            return new ObjectMapper().readValue(response, WeatherReport.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Weather getWeather() {
        return WeatherReportToWeatherMapper.toWeather(getWeatherReport());
    }
}
