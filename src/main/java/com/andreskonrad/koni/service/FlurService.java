package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.flur.Observation;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriBuilder;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FlurService {

    private int stationId = 2243;

    private static final String BASE_URL ="https://www.hydrodaten.admin.ch/graphs/";

    public List<Observation> getDischargeObservations() {
        String uri = BASE_URL + "/" + stationId + "/" + "discharge" + "_" + stationId + ".csv";
        RestTemplate restTemplate = new RestTemplate();
        String csvContent = restTemplate.getForObject(uri, String.class);

        return convertCsvToObservationList(csvContent);
    }

    public List<Observation> getTemparatureObservations() {

        String uri = BASE_URL + "/" + stationId + "/" + "temperature" + "_" + stationId + ".csv";
        RestTemplate restTemplate = new RestTemplate();
        String csvContent = restTemplate.getForObject(uri, String.class);

        return convertCsvToObservationList(csvContent);
    }

    public List<Observation> getLevelObservations() {
        String uri = BASE_URL + "/" + stationId + "/" + "level" + "_" + stationId + ".csv";
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
}
