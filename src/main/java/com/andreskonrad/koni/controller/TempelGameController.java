package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.tempel.TempelGame;
import com.andreskonrad.koni.service.TempelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game/tempel/")
public class TempelGameController {

    private final SimpMessagingTemplate template;

    private final TempelService tempelService;

    @Autowired
    public TempelGameController(SimpMessagingTemplate template, TempelService tempelService) {
        this.template = template;
        this.tempelService = tempelService;
    }

    @GetMapping()
    public ResponseEntity<TempelGame> get(@RequestParam("gameName") String gameName) {
        TempelGame game;
        try {
            game = this.tempelService.get(gameName);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("open")
    public ResponseEntity<HttpStatus> confirm(@RequestParam("gameName") String gameName, @RequestBody int cardNumber) {
        try {
            TempelGame game = this.tempelService.get(gameName);
            game.open(cardNumber);

            String message = gameName + " open";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("restart")
    public ResponseEntity<HttpStatus> restart(@RequestParam("gameName") String gameName, @RequestBody String playerName) {
        try {
            TempelGame game = this.tempelService.get(gameName);
            game.restart();

            String message = gameName + " restarted by " + playerName;
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
