package com.andreskonrad.koni.dto.housepoints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HousePointHistory {
    private House house;
    private int points;
    private String reason;
}
