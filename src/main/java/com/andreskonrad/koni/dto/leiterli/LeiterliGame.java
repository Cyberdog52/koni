package com.andreskonrad.koni.dto.leiterli;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameState;
import com.andreskonrad.koni.dto.Player;

import java.util.*;

public class LeiterliGame {

    private final Game game;
    private final HashMap<String, LeiterliField> playerToLeiterliFieldMap= new HashMap<>();
    private Set<Player> playersThatNeedToRoll;
    private final LeiterliBoard board;
    private List<LeiterliHistoryBlock> history;
    private int maxFields;

    public LeiterliGame(Game game) {
        this.game = game;
        this.board = new LeiterliBoard(maxFields);
        this.playersThatNeedToRoll = new HashSet<>();
        history = new ArrayList<>();
        maxFields = 100;
    }

    public Game getGame() {
        return this.game;
    }

    public HashMap<String, LeiterliField> getplayerToLeiterliFieldMap() {
        return playerToLeiterliFieldMap;
    }

    public Set<Player> getPlayersThatNeedToRoll() {
        return playersThatNeedToRoll;
    }

    public List<LeiterliHistoryBlock> getHistory() {
        return history;
    }

    private void addHistory(Player player, int roll, LeiterliField previousField, LeiterliField currentField) {
        LeiterliHistoryBlock block = new LeiterliHistoryBlock(player, roll, previousField, currentField);
        history.add(block);
    }

    private void assignNewPlayersThatNeedToRoll() {
        this.playersThatNeedToRoll = this.game.createPlayersCopy();
    }

    public void roll(String playerName) {

        Player player = this.game.getPlayer(playerName);
        if (!playersThatNeedToRoll.contains(player)) {
            return;
        }
        playersThatNeedToRoll.removeIf(player1 -> player1.getName().equals(playerName));

        LeiterliField previousField = playerToLeiterliFieldMap.get(playerName);
        int roll = new Random().nextInt(6) + 1;
        LeiterliField currentField = board.move(previousField, roll);
        currentField.visit();

        this.playerToLeiterliFieldMap.put(playerName, currentField);

        addHistory(player, roll, previousField, currentField );

        if (playersThatNeedToRoll.size() == 0) {
            assignNewPlayersThatNeedToRoll();
            checkIfWon();
        }
    }

    private void checkIfWon() {
        for (Player player : this.game.getPlayers() ) {
            LeiterliField leiterliField = playerToLeiterliFieldMap.get(player.getName());
            if (leiterliField.getNumber() == this.maxFields){
                this.game.setGameState(GameState.FINISHED);
            }
        }
    }
}



