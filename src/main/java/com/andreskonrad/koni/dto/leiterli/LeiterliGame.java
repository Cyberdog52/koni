package com.andreskonrad.koni.dto.leiterli;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.Player;

import java.util.*;

public class LeiterliGame {

    private final Game game;
    private final HashMap<String, Integer> playerToNumberMap = new HashMap<>();
    private final HashMap<String, Integer> playerToStarsMap = new HashMap<>();
    private Set<Player> playersThatNeedToRoll;
    private LeiterliBoard board;
    private List<LeiterliHistoryBlock> history;
    private int maxFields;
    private final List<String> avatarNames = Arrays.asList("Bowser",
            "Donkey Kong",
            "Luigi",
            "Mario",
            "Peach",
            "Toad",
            "Wario",
            "Yoshi",
            "Dani",
            "Buechi",
            "Koni",
            "Engel",
            "Dome",
            "Agumon",
            "Candy Kong",
            "Cranky Kong",
            "Daisy",
            "Diddy Kong",
            "Dixie Kong",
            "Falcon",
            "Fox",
            "Funky Kong",
            "Kiddy Kong",
            "Kirby",
            "Lanky Kong",
            "Link",
            "Mewtwo",
            "Pikachu",
            "Rabbid",
            "Rayman",
            "Rosalina",
            "Snake",
            "Sonic",
            "Tiny Kong",
            "Waluigi",
            "Wrinkly Kong"
            );

    private final HashMap<String, String> playerToAvatarMap = new HashMap<>();

    public LeiterliGame(Game game) {
        this.game = game;
        maxFields = 100;
        this.board = new LeiterliBoard(maxFields);
        this.playersThatNeedToRoll = new HashSet<>();
        history = new ArrayList<>();
        this.assignNewPlayersThatNeedToRoll();
        this.assignStartPositions();
        this.assignAvatarsToPlayers();
        this.assignStars();
    }

    public HashMap<String, String> getPlayerToAvatarMap() {
        return playerToAvatarMap;
    }

    private void assignAvatarsToPlayers() {
        Collections.shuffle(avatarNames);
        int i = 0;
        for (Player player : this.game.getPlayers()) {
            this.playerToAvatarMap.put(player.getName(), this.avatarNames.get(i % avatarNames.size()));
            i++;
        }
    }

    private void assignStartPositions() {
        for (Player player : this.game.getPlayers()) {
            playerToNumberMap.put(player.getName(), 1);
        }
    }

    private void assignStars() {
        for (Player player : this.game.getPlayers()) {
            playerToStarsMap.put(player.getName(), 0);
        }
    }

    public HashMap<String, Integer> getPlayerToNumberMap() {
        return playerToNumberMap;
    }

    public LeiterliBoard getBoard() {
        return board;
    }

    public int getMaxFields() {
        return maxFields;
    }

    public Game getGame() {
        return this.game;
    }

    public HashMap<String, Integer> getplayerToNumberMapMap() {
        return playerToNumberMap;
    }

    public Set<Player> getPlayersThatNeedToRoll() {
        return playersThatNeedToRoll;
    }

    public List<LeiterliHistoryBlock> getHistory() {
        return history;
    }

    private synchronized void addHistory(Player player, int roll, int previousNumber, int currentNumber) {
        LeiterliHistoryBlock block = new LeiterliHistoryBlock(player, roll, previousNumber, currentNumber, history.size());
        history.add(block);
    }

    private void assignNewPlayersThatNeedToRoll() {
        this.playersThatNeedToRoll = this.game.createPlayersCopy();
    }

    public synchronized void roll(String playerName) {
        Player player = this.game.getPlayer(playerName);
        if (!playersThatNeedToRoll.contains(player)) {
            return;
        }
        playersThatNeedToRoll.removeIf(player1 -> player1.getName().equals(playerName));

        int previousNumber = playerToNumberMap.get(playerName);
        int roll = new Random().nextInt(6) + 1;
        if (previousNumber + roll > maxFields) {
            roll = maxFields-previousNumber;
        }
        LeiterliField currentField = board.move(previousNumber, roll);
        currentField.visit();

        this.playerToNumberMap.put(playerName, currentField.getNumber());

        addHistory(player, roll, previousNumber, currentField.getNumber() );

        if (hasWon(playerName)) {
            this.playerToStarsMap.put(playerName, this.playerToStarsMap.get(playerName) + 1);
        }

        if (playersThatNeedToRoll.size() == 0) {
            assignNewPlayersThatNeedToRoll();
            if (oneOrMorePlayersHaveReachedEnd()) {
                newStart();
            }
        }
    }

    private boolean oneOrMorePlayersHaveReachedEnd() {
        for (Player player : this.game.getPlayers() ) {
            if (hasWon(player.getName())) {
                return true;
            }
        }
        return false;
    }

    private boolean hasWon(String playerName) {
        Integer number = playerToNumberMap.get(playerName);
        return number >= this.maxFields;
    }

    public List<String> getAvatarNames() {
        return avatarNames;
    }

    public void pickAvatar(String playerName, String avatarName) {
        this.playerToAvatarMap.put(playerName, avatarName);
    }

    public void newStart() {
        this.board = new LeiterliBoard(maxFields);
        this.playersThatNeedToRoll = new HashSet<>();
        history = new ArrayList<>();
        this.assignNewPlayersThatNeedToRoll();
        this.assignStartPositions();
    }

    public HashMap<String, Integer> getPlayerToStarsMap() {
        return playerToStarsMap;
    }
}



