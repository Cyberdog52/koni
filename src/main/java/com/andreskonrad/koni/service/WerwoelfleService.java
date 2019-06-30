package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.werwoelfle.WerwoelfleGame;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class WerwoelfleService {

    private Set<WerwoelfleGame> werwoelfleGames = new HashSet<>();

    void start(Game game) {
        WerwoelfleGame newGame = new WerwoelfleGame(game);
        werwoelfleGames.add(newGame);
    }

    public WerwoelfleGame get(String gameName) {
        return werwoelfleGames.stream()
                .filter(werwoerterGame -> werwoerterGame.getGame().getName().equals(gameName))
                .findFirst()
                .get();
    }
}
