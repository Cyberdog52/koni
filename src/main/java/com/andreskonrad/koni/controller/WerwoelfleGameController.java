package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.werwoelfle.WerwoelfleGame;
import com.andreskonrad.koni.service.WerwoelfleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game/werwoelfle/")
public class WerwoelfleGameController {

    private final SimpMessagingTemplate template;

    private final WerwoelfleService werwoelfleService;

    @Autowired
    public WerwoelfleGameController(SimpMessagingTemplate template, WerwoelfleService werwoerterService) {
        this.template = template;
        this.werwoelfleService = werwoerterService;
    }

    @GetMapping()
    public ResponseEntity<WerwoelfleGame> get(@RequestParam("gameName") String gameName) {
        WerwoelfleGame game;
        try {
            game = this.werwoelfleService.get(gameName);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("confirm")
    public ResponseEntity<HttpStatus> confirm(@RequestParam("gameName") String gameName, @RequestBody String playerName) {
        try {
            WerwoelfleGame game = this.werwoelfleService.get(gameName);
            game.confirm(playerName);

            String message = gameName + " confirm";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("vote")
    public ResponseEntity<HttpStatus> vote(@RequestParam("gameName") String gameName, @RequestParam("fromName") String fromName, @RequestBody String toName) {
        try {
            WerwoelfleGame game = this.werwoelfleService.get(gameName);
            game.vote(fromName, toName);

            String message = gameName + " vote";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
