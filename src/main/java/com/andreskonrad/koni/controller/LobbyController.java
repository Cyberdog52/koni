package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameType;
import com.andreskonrad.koni.dto.Profile;
import com.andreskonrad.koni.service.LobbyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/game")
public class LobbyController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private LobbyService lobbyService;

    @GetMapping
    public List<Game> getGames() {
        return lobbyService.getGames();
    }

    @PostMapping("create")
    public ResponseEntity<Game> createGame(@RequestBody Profile profile, @RequestParam("gameName") String gameName, @RequestParam("gameType") GameType gameType ) {
        Game game;
        try {
            game = lobbyService.createGame(gameName, profile, gameType);

            String message = gameName + " created";
            this.template.convertAndSend("/lobby", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("join")
    public ResponseEntity<Game> joinGame(@RequestBody Profile profile, @RequestParam("gameName") String gameName) {
        Game game;
        try {
            game = lobbyService.joinGame(gameName, profile);

            String message = profile.getIdentity().getName() + " joined";
            this.template.convertAndSend("/lobby", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("leave")
    public ResponseEntity<Game> leaveGame(@RequestBody Profile profile, @RequestParam("gameName") String gameName){
        Game game;
        try {
            game = lobbyService.leaveGame(gameName, profile);

            String message = profile.getIdentity().getName() + " left";
            this.template.convertAndSend("/lobby", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("delete")
    public ResponseEntity<Game> deleteGame(@RequestBody Profile profile, @RequestParam("gameName") String gameName) {
        Game game;
        try {
            game = lobbyService.deleteGame(gameName);

            String message = gameName + " deleted";
            this.template.convertAndSend("/lobby", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("start")
    public ResponseEntity<HttpStatus> startGame(@RequestParam("gameName") String gameName) {
        try {
            this.lobbyService.startGame(gameName);

            String message = "START " + gameName;
            this.template.convertAndSend("/lobby", message);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
