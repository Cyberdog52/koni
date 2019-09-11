package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.leiterli.LeiterliGame;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class LeiterliService {

    private Set<LeiterliGame> leiterliGames = new HashSet<>();

    void start(Game game) {
        LeiterliGame newGame = new LeiterliGame(game);
        leiterliGames.add(newGame);
    }

    public LeiterliGame get(String gameName) {
        return leiterliGames.stream()
                .filter(leiterliGame -> leiterliGame.getGame().getName().equals(gameName))
                .findFirst()
                .get();
    }
}
