package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.housepoints.House;
import com.andreskonrad.koni.dto.housepoints.HousePointHistory;
import com.andreskonrad.koni.dto.housepoints.HousePointResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HousePointService {

    private Map<House, Integer> housePointMap = new HashMap<>(Map.of(House.GRYFFINDOR, 0, House.SLYTHERIN, 0, House.HUFFLEPUFF, 0, House.RAVENCLAW, 0));

    private List<HousePointHistory> historyList = new ArrayList<>();

    public HousePointResponse getPoints() {
        return new HousePointResponse(housePointMap.get(House.GRYFFINDOR), housePointMap.get(House.SLYTHERIN), housePointMap.get(House.HUFFLEPUFF), housePointMap.get(House.RAVENCLAW));
    }

    public List<HousePointHistory> getHistory() {
        return historyList;
    }

    public List<HousePointHistory> updateHistory(HousePointHistory history) {
        System.out.println(history);
        Integer previousPoints = housePointMap.get(history.getHouse());
        housePointMap.put(history.getHouse(), previousPoints + history.getPoints());
        historyList.add(history);
        return historyList;
    }
}
