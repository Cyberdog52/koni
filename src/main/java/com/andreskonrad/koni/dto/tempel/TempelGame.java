package com.andreskonrad.koni.dto.tempel;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameState;
import com.andreskonrad.koni.dto.Player;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class TempelGame {

    private final Game game;
    private HashMap<String, TempelRole> playerToTempelRoleMap;
    private Player keyPlayer;
    private List<TempelCard> cards;
    private int round;
    private TempelState state;
    private int totalGold;
    private int totalFalle;
    private int totalLeer;
    private TempelCard lastOpenedCard;
    private int resetCount;
    private List<TempelMessage> messages;

    public TempelGame(Game game) {
        this.game = game;
        this.resetCount = 0;
        initState();
    }

    private void initState() {
        this.game.setGameState(GameState.RUNNING);
        this.playerToTempelRoleMap = new HashMap<>();
        this.keyPlayer = getRandomPlayer();
        round = 1;
        state = TempelState.RUNNING;
        lastOpenedCard = null;
        messages = new ArrayList<>();
        this.assignRoles();
        this.createCards();
        this.assignCards();
    }

    public void restart() {
        this.initState();
        this.resetCount++;
    }

    private int numberOfOpenedCards() {
        return (int) this.cards.stream()
                .filter(TempelCard::isOpened)
                .count();
    }

    private int goldOpenend() {
        return (int) this.cards.stream()
                .filter(TempelCard::isOpened)
                .filter(tempelCard -> tempelCard.getTempelCardType() == TempelCardType.GOLD)
                .count();
    }

    private int falleOpened() {
        return (int) this.cards.stream()
                .filter(TempelCard::isOpened)
                .filter(tempelCard -> tempelCard.getTempelCardType() == TempelCardType.FALLE)
                .count();
    }

    private int getRoundNumber() {
        return ((numberOfOpenedCards()) / game.createPlayersCopy().size()) + 1;
    }

    private void assignCards() {
        Collections.shuffle(cards);
        cards.forEach(tempelCard -> tempelCard.setAssignedPlayer(null));
        List<TempelCard> unopenedCards = this.cards.stream()
                .filter(tempelCard -> !tempelCard.isOpened())
                .collect(Collectors.toList());
        Collections.shuffle(unopenedCards);

        int count = 0;
        for (Player player : this.game.createPlayersCopy()) {
            for (int i = 0; i < 6 - round; i++) {
                unopenedCards.get(count).setAssignedPlayer(player);
                count++;
            }
        }
        Collections.shuffle(cards);
    }

    public void open(int cardNumber) {
        List<TempelCard> availableCards = this.cards.stream()
                .filter(tempelCard -> tempelCard.getAssignedPlayer() != null)
                .filter(tempelCard -> !tempelCard.isOpened())
                .filter(tempelCard -> tempelCard.getId() == cardNumber)
                .collect(Collectors.toList());
        if (availableCards.size() > 0) {
            TempelCard openedCard = availableCards.get(0);
            this.lastOpenedCard = openedCard;
            this.messages.add(new TempelMessage(this.messages.size(), getOpenedMessage(), lastOpenedCard.getTempelCardType()));
            this.keyPlayer = openedCard.getAssignedPlayer();
            openedCard.open();
        }

        if (getRoundNumber() > round) {
            this.messages.add(new TempelMessage(this.messages.size(), "Neue Runde! Die Karten werden jetzt gemischelt."));
            round = getRoundNumber();
            assignCards();
        }

        checkGameEnd();
    }

    private String getOpenedMessage() {
        return this.keyPlayer.getName() +
                " hat eine " +
                TempelCardType.getName(this.lastOpenedCard.getTempelCardType()) +
                " geöffnet. Den Schlüssel trägt nun " +
                this.lastOpenedCard.getAssignedPlayer().getName() +
                ".";
    }

    private void checkGameEnd() {
        if (goldOpenend() == totalGold) {
            state = TempelState.BUEBWON;
            messages.add(new TempelMessage(this.messages.size(), "Die Schatzjäger haben gewonnen! Es wurde alles Gold aufgedeckt."));
            game.setGameState(GameState.FINISHED);
            return;
        }
        if (falleOpened() == totalFalle) {
            state = TempelState.MEITLIWON;
            messages.add(new TempelMessage(this.messages.size(), "Die Wächterinnen haben gewonnen! Es wurden alle Fallen aufgedeckt."));
            game.setGameState(GameState.FINISHED);
            return;
        }
        if (round == 5) {
            state = TempelState.MEITLIWON;
            messages.add(new TempelMessage(this.messages.size(), "Die Wächterinnen haben gewonnen! Die Schatzjäger konnten das Gold nicht innerhalb von 4 Runden finden. "));
            game.setGameState(GameState.FINISHED);
        }
    }

    private void createCards() {
        cards = new ArrayList<>();
        List<Player> players = new ArrayList<>(game.createPlayersCopy());
        switch(players.size()) {
            case 3: {
                createCards(8,5,2);
                break;
            }
            case 4: {
                createCards(12,6,2);
                break;
            }
            case 5: {
                createCards(16,7,2);
                break;
            }
            case 6: {
                createCards(20,8,2);
                break;
            }
            case 7: {
                createCards(26,7,2);
                break;
            }
            case 8: {
                createCards(30,8,2);
                break;
            }
            case 9: {
                createCards(34,9,2);
                break;
            }
            case 10: {
                createCards(37,10,3);
                break;
            }
            default: createCards(0,5 * game.createPlayersCopy().size(),0);
        }
    }

    private void createCards(int leerCount, int goldCount, int falleCount) {
        for (int i = 0; i < leerCount; i++) {
            cards.add(new TempelCard(TempelCardType.LEER));
        }
        for (int i = 0; i < goldCount; i++) {
            cards.add(new TempelCard(TempelCardType.GOLD));
        }
        for (int i = 0; i < falleCount; i++) {
            cards.add(new TempelCard(TempelCardType.FALLE));
        }
        totalFalle = falleCount;
        totalGold = goldCount;
        totalLeer = leerCount;
    }

    private Player getRandomPlayer() {
        List<Player> players = new ArrayList<>(game.createPlayersCopy());
        Collections.shuffle(players);
        return players.get(0);
    }

    public Game getGame() {
        return game;
    }

    public HashMap<String, TempelRole> getPlayerToTempelRoleMap() {
        return playerToTempelRoleMap;
    }

    private void assignRoles() {
        List<Player> players = new ArrayList<>(game.createPlayersCopy());

        switch(players.size()) {
            case 3: {
                assign(2, 2);
                break;
            }
            case 4:
            case 5: {
                assign(3, 2);
                break;
            }
            case 6: {
                assign(4, 2);
                break;
            }
            case 7: {
                assign(5, 3);
                break;
            }
            case 8:
            case 9: {
                assign(6, 3);
                break;
            }
            case 10: {
                assign(7, 3);
                break;
            }
            default: assign(players.size(), 0);
        }
    }

    private void assign(int numberOfBuebe, int numberOfMeitli) {
        List<TempelRole> tempelRoleList = new ArrayList<>();
        for (int i = 0; i< numberOfBuebe; i++) {
            tempelRoleList.add(TempelRole.BUEB);
        }
        for (int i = 0; i< numberOfMeitli; i++) {
            tempelRoleList.add(TempelRole.MEITLI);
        }
        Collections.shuffle(tempelRoleList);

        int count = 0;
        for (Player player : game.createPlayersCopy()) {
            playerToTempelRoleMap.put(player.getName(), tempelRoleList.get(count));
            count ++;
        }
    }

    public Player getKeyPlayer() {
        return keyPlayer;
    }

    public List<TempelCard> getCards() {
        return cards;
    }

    public int getResetCount() {
        return resetCount;
    }

    public List<TempelMessage> getMessages() {
        return messages;
    }

    public TempelCard getLastOpenedCard() {
        return this.lastOpenedCard;
    }

    public int getRound() {
        return round;
    }

    public TempelState getState() {
        return state;
    }

    public int getTotalGold() {
        return totalGold;
    }

    public int getTotalFalle() {
        return totalFalle;
    }

    public int getTotalLeer() {
        return totalLeer;
    }


}

enum TempelRole {
    MEITLI, BUEB
}

enum TempelState {
    RUNNING, MEITLIWON, BUEBWON;
}
