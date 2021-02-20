package com.andreskonrad.koni.dto.flur;

public class WeatherType {
    private int id;
    private String description;

    public WeatherType(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}
/*
1 Sonne
2 Teils bewölkt
3 Bewölkt
4 Bedeckt
5 Teils bewölkt mit leichtem Regen
6 Bewölkt mit leichtem Regen
7 Bedeckt mit leichtem Regen
8 Teils bewölkt mit mäßigem Regen
9 Bewölkt mit mäßigem Regen
10 Bedeckt mit mäßigem Regen
11 Teils bewölkt mit starken Regenschauern
12 Bewölkt mit stürmischen Regenschauern
13 Bedeckt mit stürmischen Regenschauern
14 Teils bewölkt mit stürmischen Regenschauern und Hagel
15 Bewölkt mit stürmischen Regenschauern und Hagel
16 Bedeckt mit stürmischen Regenschauern und Hagel
17 Teils bewölkt mit Schnee
18 Bewölkt mit Schnee
19 Bedeckt mit Schneeschauern
20 Teils bewölkt mit Schneeregen
21 Bewölkt mit Schneeregen
22 Bedeckt mit Schneeregen
 */
