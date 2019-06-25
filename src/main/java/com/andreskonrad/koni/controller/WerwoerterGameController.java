package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.werwoerter.WerwoerterGame;
import com.andreskonrad.koni.dto.werwoerter.WerwoerterMarker;
import com.andreskonrad.koni.service.WerwoerterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game/werwoerter/")
public class WerwoerterGameController {

    private final SimpMessagingTemplate template;

    private final WerwoerterService werwoerterService;

    @Autowired
    public WerwoerterGameController(SimpMessagingTemplate template, WerwoerterService werwoerterService) {
        this.template = template;
        this.werwoerterService = werwoerterService;
    }

    @GetMapping()
    public ResponseEntity<WerwoerterGame> get(@RequestParam("gameName") String gameName) {
        WerwoerterGame game;
        try {
            game = this.werwoerterService.get(gameName);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("confirm")
    public ResponseEntity<HttpStatus> confirm(@RequestParam("gameName") String gameName, @RequestBody String playerName) {
        try {
            WerwoerterGame game = this.werwoerterService.get(gameName);
            game.confirm(playerName);

            String message = gameName + " confirm";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("guessPlayer")
    public ResponseEntity<HttpStatus> guessPlayer(@RequestParam("gameName") String gameName, @RequestParam("playerName") String playerName, @RequestBody String guessName) {
        try {
            WerwoerterGame game = this.werwoerterService.get(gameName);
            game.guessPlayer(playerName, guessName);

            String message = gameName + " guessPlayer";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "marker")
    public ResponseEntity<HttpStatus> setMarker(@RequestParam("gameName") String gameName, @RequestBody String markerAsString) {
        try {
            WerwoerterGame game = this.werwoerterService.get(gameName);
            game.addMarker(WerwoerterMarker.fromString(markerAsString));

            String message = gameName + " marker";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
