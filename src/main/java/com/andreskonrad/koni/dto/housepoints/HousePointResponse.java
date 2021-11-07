package com.andreskonrad.koni.dto.housepoints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HousePointResponse {
    private int gryffindor;
    private int slytherin;
    private int hufflepuff;
    private int ravenclaw;
}
