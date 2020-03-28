package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.tempel.TempelGame;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TempelService {

    private Set<TempelGame> tempelGames = new HashSet<>();

    void start(Game game) {
        TempelGame newGame = new TempelGame(game);
        tempelGames.add(newGame);
    }

    public TempelGame get(String gameName) {
        return tempelGames.stream()
                .filter(tempelGame -> tempelGame.getGame().getName().equals(gameName))
                .findFirst()
                .get();
    }
}
