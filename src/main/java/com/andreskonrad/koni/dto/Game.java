package com.andreskonrad.koni.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Game {

    private final String name;
    private final Set<Player> players;
    private GameState state;
    private GameType gameType;

    public Game(String name, GameType gameType) {
        this.name = name;
        this.players = new HashSet<>();
        this.state = GameState.CREATED;
        this.gameType = gameType;
    }

    public String getName() {
        return name;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public Set<Player> createPlayersCopy() {
        return new HashSet<>(players);
    }

    public GameState getState() {
        return state;
    }

    public void join(Profile profile) {
        Player player = new Player(profile.getIdentity());
        players.add(player);
    }

    public Player getPlayer(String playerName) {
        return players.stream().filter(player -> player.getName().equalsIgnoreCase(playerName))
                .findFirst().orElse(null);
    }

    public void leave(Profile profile) {
        players.removeIf(player -> player.getName().equals(profile.getIdentity().getName()));
    }

    public void setGameState(GameState gameState) {
        this.state = gameState;
    }

    public GameType getGameType() {
        return gameType;
    }
}


