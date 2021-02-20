package com.andreskonrad.koni.dto.flur;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

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

    private static Double getClosestValue(List<Observation> observations) {
        return observations.stream()
                .min(Comparator.comparingLong(o -> Math.abs(o.getDate().toInstant().getEpochSecond() - Instant.now().getEpochSecond())))
                .get()
                .getValue();
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
