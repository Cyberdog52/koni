package com.andreskonrad.koni.dto.werwoerter;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameState;
import com.andreskonrad.koni.dto.Player;
import com.andreskonrad.koni.service.IO;

import java.util.*;
import java.util.stream.Collectors;

public class WerwoerterGame {

    private final Game game;
    private final HashMap<String, WerwoerterRole> playerToWerwoerterRoleMap = new HashMap<>();
    private Player mayor;
    private Set<Player> playersThatNeedToConfirm;
    private Set<Player> playersThatVoted;
    private WerwoerterPhase phase;
    private List<WerwoerterMarker> markers;
    private String word;
    private List<Player> guessedPlayers;

    public WerwoerterGame(Game game) {
        this.game = game;
        this.assignRoles();
        playersThatNeedToConfirm = game.createPlayersCopy();
        phase = WerwoerterPhase.ROLE;
        word = createRandomWord();
        guessedPlayers = new ArrayList<Player>();
        markers = new ArrayList<WerwoerterMarker>();
        playersThatVoted = new HashSet<>();
    }

    public Set<Player> getPlayersThatVoted() {
        return playersThatVoted;
    }

    public void setPlayersThatVoted(Set<Player> playersThatVoted) {
        this.playersThatVoted = playersThatVoted;
    }

    public List<WerwoerterMarker> getMarkers() {
        return markers;
    }

    public void setMarkers(List<WerwoerterMarker> markers) {
        this.markers = markers;
    }

    private Set<String> usedWords = new HashSet<>();

    private String createRandomWord() {
        String wordsAsString = IO.readFileFromResources("werwoerter/kotnames.txt");
        String[] words = wordsAsString.split("\\s+");

        //cleanup if too many words used
        if (usedWords.size() >= words.length / 2) {
            usedWords.removeAll(usedWords);
        }

        String randomWord = "";

        if (words.length > 1) {
            Random random = new Random();
            do {
                randomWord = words[random.nextInt(words.length)];
            } while (randomWord.length() == 0 || usedWords.contains(randomWord));
            usedWords.add(randomWord);
        }

        return randomWord;
    }

    public String getWord() {
        return word;
    }

    public List<Player> getGuessedPlayers() {
        return guessedPlayers;
    }

    public Game getGame() {
        return game;
    }

    public Set<Player> getPlayersThatNeedToConfirm() {
        return playersThatNeedToConfirm;
    }

    public void setPlayersThatNeedToConfirm(Set<Player> playersThatNeedToConfirm) {
        this.playersThatNeedToConfirm = playersThatNeedToConfirm;
    }

    public List<Player> getPlayersForRole(WerwoerterRole role) {
        List<Player> players = new ArrayList<>();
        for (Player player : this.game.createPlayersCopy()) {
            if (playerToWerwoerterRoleMap.get(player.getName()).equals(role)) {
                players.add(player);
            }
        }
        return players;
    }

    public HashMap<String, WerwoerterRole> getPlayerToWerwoerterRoleMap() {
        return playerToWerwoerterRoleMap;
    }

    public Player getMayor() {
        return mayor;
    }

    private void assignRoles() {
        List<Player> players = new ArrayList<>(game.createPlayersCopy());

        assignMayor(players);

        assign(players, WerwoerterRole.SEER, 1);

        if (players.size() >= 6) {
            assign(players, WerwoerterRole.WEREWOLF, 2);
        } else {
            assign(players, WerwoerterRole.WEREWOLF, 1);
        }

        //fill the rest
        assign(players, WerwoerterRole.CITIZEN, players.size());
    }

    private void assign(List<Player> players, WerwoerterRole role, int maxCount) {
        Collections.shuffle(players);

        List<Player> unassignedPlayers = getUnassignedPlayers(players);
        if (unassignedPlayers.size() == 0) {
            return;
        }

        for (int playerNo = 0; playerNo < Math.min(unassignedPlayers.size(), maxCount); playerNo++) {
            playerToWerwoerterRoleMap.put(unassignedPlayers.get(playerNo).getName(), role);
        }
    }

    private List<Player> getUnassignedPlayers(List<Player> players) {
        return players.stream()
                .filter(player -> !playerToWerwoerterRoleMap.keySet().contains(player.getName()))
                .collect(Collectors.toList());
    }

    private void assignMayor(List<Player> players) {
        Collections.shuffle(players);
        if (players.size() > 0) {
            this.mayor = players.get(0);
        }
    }

    public WerwoerterPhase getPhase() {
        return phase;
    }

    public void setPhase(WerwoerterPhase phase) {
        this.phase = phase;
    }

    public void confirm(String playerName) {
        playersThatNeedToConfirm.removeIf(player -> player.getName().equals(playerName));

        if (playersThatNeedToConfirm.size() == 0) {
            phaseSwitch();
            assignNewPlayersThatNeedToConfirm();
            playersThatVoted = new HashSet<>();
        }
    }

    private void assignNewPlayersThatNeedToConfirm() {
        switch (phase) {
            case ROLE: {
                playersThatNeedToConfirm = game.createPlayersCopy();
                break;
            }
            case READ: {
                playersThatNeedToConfirm = game.createPlayersCopy();
                break;
            }
            case ASK: {
                HashSet<Player> players = new HashSet<>();
                players.add(mayor);
                playersThatNeedToConfirm = players;
                break;
            }
            case WEREVOTE: {
                playersThatNeedToConfirm = new HashSet<>(getPlayersForRole(WerwoerterRole.WEREWOLF));
                break;
            }
            case CITIZENVOTE: {
                playersThatNeedToConfirm = game.createPlayersCopy();
                break;
            }
            case CITIZENWON: {
                game.createPlayersCopy();
                break;
            }
            case WEREWOLFSWON: {
                game.createPlayersCopy();
                break;
            }
        }
    }

    private void phaseSwitch() {
        switch (phase) {
            case ROLE: {
                phase = WerwoerterPhase.READ;
                break;
            }
            case READ: {
                phase = WerwoerterPhase.ASK;
                break;
            }
            case ASK: {
                if (markers.contains(WerwoerterMarker.WORDFOUND)) {
                    phase = WerwoerterPhase.WEREVOTE;
                } else {
                    if (markers.contains(WerwoerterMarker.WORDNOTFOUND)) {
                        phase = WerwoerterPhase.CITIZENVOTE;
                    }
                }
                break;
            }
            case WEREVOTE: {
                int numberOfCorrectGuesses = getPlayersForRole(WerwoerterRole.SEER).stream()
                        .filter(player -> guessedPlayers.contains(player))
                        .collect(Collectors.toList()).size();
                if (numberOfCorrectGuesses >= 1) {
                    phase = WerwoerterPhase.WEREWOLFSWON;
                } else {
                    phase = WerwoerterPhase.CITIZENWON;
                }
                break;
            }
            case CITIZENVOTE: {
                Set<WerwoerterRole> majorityRoles = getMajorityRoleForPlayers();
                if (majorityRoles.contains(WerwoerterRole.WEREWOLF)) {
                    phase = WerwoerterPhase.CITIZENWON;
                } else {
                    phase = WerwoerterPhase.WEREWOLFSWON;
                }

                break;
            }
            case CITIZENWON: {
                game.setGameState(GameState.FINISHED);
                break;
            }
            case WEREWOLFSWON: {
                game.setGameState(GameState.FINISHED);
                break;
            }
        }
    }

    public Set<WerwoerterRole> getMajorityRoleForPlayers() {
        Set<Player> mostCommonPlayers = mostCommon(guessedPlayers);
        Set<WerwoerterRole> mostCommonRoles = new HashSet<>();
        if (mostCommonPlayers.size() == game.getPlayers().size()) {
            return mostCommonRoles;
        }
        for (Player player : mostCommonPlayers) {
            mostCommonRoles.add(playerToWerwoerterRoleMap.get(player.getName()));
        }
        return mostCommonRoles;
    }

    public void guessPlayer(String playerName, String guessName) throws IllegalArgumentException {
        Player votingPlayer = game.getPlayer(playerName);
        Player guessPlayer = game.getPlayer(guessName);
        if (votingPlayer == null || guessPlayer == null) {
            throw new IllegalArgumentException("Player not found");
        }
        if (playersThatVoted.contains(votingPlayer)) {
            throw new IllegalArgumentException("Already voted");
        }
        playersThatVoted.add(votingPlayer);
        guessedPlayers.add(guessPlayer);
    }

    private static <T> Set<T> mostCommon(List<T> list) {
        Map<T, Integer> map = new HashMap<>();

        for (T t : list) {
            Integer val = map.get(t);
            map.put(t, val == null ? 1 : val + 1);
        }

        Set<T> max = new HashSet<T>();
        int maxValue = -1;

        for (Map.Entry<T, Integer> e : map.entrySet()) {
            if (max.size() == 0 || e.getValue() > maxValue) {
                max = new HashSet<T>();
                max.add(e.getKey());
                maxValue = e.getValue();
            }
            else if (e.getValue() == maxValue) {
                max.add(e.getKey());
            }
        }

        return max;
    }

    public void addMarker(WerwoerterMarker newMarker) {
        if (newMarker.equals(WerwoerterMarker.WORDFOUND) || newMarker.equals(WerwoerterMarker.WORDNOTFOUND)) {
            this.markers.remove(WerwoerterMarker.WORDFOUND);
            this.markers.remove(WerwoerterMarker.WORDNOTFOUND);
        }
        this.markers.add(newMarker);
    }
}
