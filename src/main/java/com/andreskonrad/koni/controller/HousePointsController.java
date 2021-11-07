package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.housepoints.House;
import com.andreskonrad.koni.dto.housepoints.HousePointHistory;
import com.andreskonrad.koni.dto.housepoints.HousePointResponse;
import com.andreskonrad.koni.service.HousePointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/housePoints/")
public class HousePointsController {

    private final HousePointService housePointService;

    @Autowired
    public HousePointsController(HousePointService housePointService) {
        this.housePointService = housePointService;
    }

    @GetMapping("house/{house}")
    public ResponseEntity<HousePointResponse> getPoints(@PathVariable House house) {
        HousePointResponse response;
        try {
            response = this.housePointService.getPoints(house);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("history")
    public ResponseEntity<List<HousePointHistory>> getHistory() {
        List<HousePointHistory> histories;
        try {
            histories = this.housePointService.getHistory();
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(histories, HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<List<HousePointHistory>> updateHistory(@RequestBody HousePointHistory history) {
        List<HousePointHistory> histories;
        try {
            histories = this.housePointService.updateHistory(history);
        } catch (Exception exception) {
            System.out.println(exception);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(histories, HttpStatus.OK);
    }
}
