package com.andreskonrad.koni.dto;

import java.util.HashSet;
import java.util.Set;

public class Game {

    private final String name;
    private final Set<Player> players;
    private GameState state;
    private GameType gameType;
    private final String creator;

    public Game(String name, GameType gameType, String creatorName) {
        this.name = name;
        this.creator = creatorName;
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

    public void join(String profileName) {
        Player player = new Player(profileName);
        players.add(player);
    }

    public Player getPlayer(String playerName) {
        return players.stream().filter(player -> player.getName().equalsIgnoreCase(playerName))
                .findFirst().orElse(null);
    }

    public void leave(String profileName) {
        players.removeIf(player -> player.getName().equals(profileName));
    }

    public void setGameState(GameState gameState) {
        this.state = gameState;
    }

    public GameType getGameType() {
        return gameType;
    }

    public String getCreator() {
        return creator;
    }
}


