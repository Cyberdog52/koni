package com.andreskonrad.koni.dto.werwoelfle;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameState;
import com.andreskonrad.koni.dto.Player;

import java.util.*;
import java.util.stream.Collectors;

import static com.andreskonrad.koni.dto.werwoelfle.WerwoelflePhase.DAYPHASE;
import static com.andreskonrad.koni.dto.werwoelfle.WerwoelflePhase.WEREWOLFPHASE;

public class WerwoelfleGame {

    private final Game game;
    private final HashMap<String, WerwoelfleRole> playerToWerwoelfleRoleMap = new HashMap<>();
    private Player mayor;
    private Set<Player> playersThatNeedToConfirm;
    private WerwoelflePhase phase;
    private Set<Vote> votes;
    private Set<Player> dyingPlayers;
    private List<WerwoelfleHistoryBlock> history;

    public WerwoelfleGame(Game game) {
        this.game = game;
        this.assignRoles();
        phase = WerwoelflePhase.ROLE;
        votes = new HashSet<>();
        dyingPlayers = new HashSet<>();
        history = new ArrayList<>();
        playersThatNeedToConfirm = game.createPlayersCopy();
    }

    public HashMap<String, WerwoelfleRole> getPlayerToWerwoelfleRoleMap() {
        return playerToWerwoelfleRoleMap;
    }

    public Player getMayor() {
        return mayor;
    }

    public Set<Player> getPlayersThatNeedToConfirm() {
        return playersThatNeedToConfirm;
    }

    public WerwoelflePhase getPhase() {
        return phase;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public Set<Player> getDyingPlayers() {
        return dyingPlayers;
    }

    public List<WerwoelfleHistoryBlock> getHistory() {
        return history;
    }

    private void assignMayor(List<Player> players) {
        Collections.shuffle(players);
        if (players.size() > 0) {
            this.mayor = players.get(0);
        }
    }

    private void assignRoles() {
        List<Player> players = new ArrayList<>(game.createPlayersCopy());

        assignMayor(players);

        if (players.size() >= 6) {
            assign(players, WerwoelfleRole.WEREWOLF, 2);
        } else {
            assign(players, WerwoelfleRole.WEREWOLF, 1);
        }

        //fill the rest
        assign(players, WerwoelfleRole.CITIZEN, players.size());
    }

    private void assign(List<Player> players, WerwoelfleRole role, int maxCount) {
        Collections.shuffle(players);

        List<Player> unassignedPlayers = getUnassignedPlayers(players);
        if (unassignedPlayers.size() == 0) {
            return;
        }

        for (int playerNo = 0; playerNo < Math.min(unassignedPlayers.size(), maxCount); playerNo++) {
            playerToWerwoelfleRoleMap.put(unassignedPlayers.get(playerNo).getName(), role);
        }
    }

    private List<Player> getUnassignedPlayers(List<Player> players) {
        return players.stream()
                .filter(player -> !playerToWerwoelfleRoleMap.keySet().contains(player.getName()))
                .collect(Collectors.toList());
    }

    public Game getGame() {
        return this.game;
    }

    public void confirm(String playerName) {
        playersThatNeedToConfirm.removeIf(player -> player.getName().equals(playerName));

        if (playersThatNeedToConfirm.size() == 0) {
            addHistory();
            phaseSwitch();
            assignNewPlayersThatNeedToConfirm();
            clearVotes();
        }
    }

    private void clearVotes() {
        this.votes = new HashSet<>();
    }

    private void addHistory() {
        WerwoelfleHistoryBlock block = new WerwoelfleHistoryBlock(this.phase, new HashSet<>(this.votes));
        history.add(block);
    }

    private void assignNewPlayersThatNeedToConfirm() {
        //TODO make more granular
        this.playersThatNeedToConfirm = this.game.createPlayersCopy();
    }

    private void phaseSwitch() {
        switch (this.phase) {
            case ROLE: {
                this.phase = WEREWOLFPHASE;
                break;
            }
            case WEREWOLFPHASE: {
                this.phase = DAYPHASE;
                break;
            }
            case DAYPHASE: {
                this.phase = WEREWOLFPHASE;
                break;
            }

            case WEREWOLFSWON: {
                this.game.setGameState(GameState.FINISHED);
                break;
            }

            case CITIZENWON: {
                this.game.setGameState(GameState.FINISHED);
                break;
            }

        }
    }

    public void vote(String fromName, String toName) {
        Vote vote = new Vote(fromName, toName);
        votes.add(vote);
    }
}



