package com.andreskonrad.koni.dto.flur;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class WeatherReportToWeatherMapper {

    public static Weather toWeather(WeatherReport report) {
        WeatherType weatherType = getWeatherType(report);
        List<Observation> temperatureObservations = getTemperatureObservations(report);
        List<Observation> rainObservations = getRainObservations(report);
        List<Observation> windObservations = getWindObservations(report);
        Double temperature = getClosestValue(temperatureObservations);
        Double rain = getClosestValue(rainObservations);
        Double wind = getClosestValue(windObservations);
        return new Weather(temperature, rain, wind, weatherType, temperatureObservations, rainObservations, windObservations);
    }

    private static double getClosestValue(List<Observation> observations) {
        List<Observation> observationsSortedByCloseness = observations.stream()
                .sorted(Comparator.comparingLong(o -> Math.abs(o.getDate().toInstant().getEpochSecond() - Instant.now().getEpochSecond())))
                .collect(Collectors.toList());

        if (observationsSortedByCloseness.size() == 0) {
            return 0;
        }
        if (observationsSortedByCloseness.size() == 1) {
            return observationsSortedByCloseness.get(0).getValue();
        }

        long distanceToClosest = Math.abs(Instant.now().getEpochSecond() - observationsSortedByCloseness.get(0).getDate().toInstant().getEpochSecond());
        long distanceToSecondClosest = Math.abs(Instant.now().getEpochSecond() - observationsSortedByCloseness.get(1).getDate().toInstant().getEpochSecond());

        double weightedValue = (observationsSortedByCloseness.get(0).getValue() * distanceToSecondClosest + observationsSortedByCloseness.get(1).getValue() * distanceToClosest) / (distanceToClosest + distanceToSecondClosest);
        return weightedValue;
    }

    private static List<Observation> getWindObservations(WeatherReport report) {
        ArrayList<Observation> observations = new ArrayList<>();
        for (Day day : report.getSortedDays()) {
            for (Hour hour : day.getHour()) {
                Date dateTime = getDate(day, hour);
                observations.add(new Observation(dateTime, Double.parseDouble(hour.getWind().getSpeed())));
            }
        }
        return observations;
    }

    private static List<Observation> getRainObservations(WeatherReport report) {
        ArrayList<Observation> observations = new ArrayList<>();
        for (Day day : report.getSortedDays()) {
            for (Hour hour : day.getHour()) {
                Date dateTime = getDate(day, hour);
                observations.add(new Observation(dateTime, Double.parseDouble(hour.getRain())));
            }
        }
        return observations;
    }

    private static List<Observation> getTemperatureObservations(WeatherReport report) {
        ArrayList<Observation> observations = new ArrayList<>();
        for (Day day : report.getSortedDays()) {
            for (Hour hour : day.getHour()) {
                Date dateTime = getDate(day, hour);
                observations.add(new Observation(dateTime, Double.parseDouble(hour.getTemp())));
            }
        }
        return observations;
    }

    private static Date getDate(Day day, Hour hour) {
        Date dateTime;
        try {
            dateTime = new SimpleDateFormat("yyyyMMddHH:mm").parse(day.getDate() + hour.getInterval());
        } catch (ParseException e) {
            dateTime = null;
        }
        return dateTime;
    }

    private static WeatherType getWeatherType(WeatherReport report) {
        if (report.getSortedDays().size() == 0) {
            return null;
        }
        return new WeatherType(Integer.parseInt(report.getSortedDays().get(0).getSymbol_value()), report.getSortedDays().get(0).getSymbol_description());

    }


}
