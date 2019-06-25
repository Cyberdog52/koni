package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.werwoerter.WerwoerterGame;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class WerwoerterService {

    private Set<WerwoerterGame> werwoerterGames = new HashSet<>();

    void start(Game game) {
        WerwoerterGame newGame = new WerwoerterGame(game);
        werwoerterGames.add(newGame);
    }

    public WerwoerterGame get(String gameName) {
        return werwoerterGames.stream()
                .filter(werwoerterGame -> werwoerterGame.getGame().getName().equals(gameName))
                .findFirst()
                .get();
    }
}
