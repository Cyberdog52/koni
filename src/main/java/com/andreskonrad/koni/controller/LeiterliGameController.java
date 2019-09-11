package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.leiterli.LeiterliGame;
import com.andreskonrad.koni.service.LeiterliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game/leiterli/")
public class LeiterliGameController {

    private final SimpMessagingTemplate template;

    private final LeiterliService leiterliService;

    @Autowired
    public LeiterliGameController(SimpMessagingTemplate template, LeiterliService leiterliService) {
        this.template = template;
        this.leiterliService = leiterliService;
    }

    @GetMapping()
    public ResponseEntity<LeiterliGame> get(@RequestParam("gameName") String gameName) {
        LeiterliGame game;
        try {
            game = this.leiterliService.get(gameName);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("roll")
    public ResponseEntity<HttpStatus> roll(@RequestParam("gameName") String gameName, @RequestBody String playerName) {
        try {
            LeiterliGame game = this.leiterliService.get(gameName);
            game.roll(playerName);

            String message = gameName + " roll";
            this.template.convertAndSend("/game", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
