package com.andreskonrad.koni.dto;

import com.andreskonrad.koni.dto.werwoerter.WerwoerterGame;
import com.andreskonrad.koni.dto.werwoerter.WerwoerterRole;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class WerwoerterGameTest {

    @Test
    public void constructor_5players_initializeCorrectly() {
        List<Profile> profiles = createNewProfiles(5);
        Game game = new Game("new", GameType.WERWOERTER, "asdf");
        profiles.stream()
                .map(Profile::getIdentity)
                .map(Identity::getName)
                .forEach(game::join);

        WerwoerterGame wgs = new WerwoerterGame(game);

        assertThat(wgs.getMayor(), is(not(nullValue())));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.WEREWOLF).size(), is(1));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.SEER).size(), is(1));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.CITIZEN).size(), is(3));
    }

    @Test
    public void constructor_6players_initializeCorrectly() {
        List<Profile> profiles = createNewProfiles(6);
        Game game = new Game("new", GameType.WERWOERTER, "asdf");
        profiles.stream()
                .map(Profile::getIdentity)
                .map(Identity::getName)
                .forEach(game::join);

        WerwoerterGame wgs = new WerwoerterGame(game);

        assertThat(wgs.getMayor(), is(not(nullValue())));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.WEREWOLF).size(), is(2));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.SEER).size(), is(1));
        assertThat(wgs.getPlayersForRole(WerwoerterRole.CITIZEN).size(), is(3));
    }

    @Test
    public void guessPlayer_majorityCorrect() {
        List<Profile> profiles = createNewProfiles(5);
        Game game = new Game("new", GameType.WERWOERTER, "asdf");
        profiles.stream()
                .map(Profile::getIdentity)
                .map(Identity::getName)
                .forEach(game::join);
        WerwoerterGame wgs = new WerwoerterGame(game);

        Player werwolfPlayer = wgs.getPlayersForRole(WerwoerterRole.WEREWOLF).get(0);
        Player seerPlayer = wgs.getPlayersForRole(WerwoerterRole.SEER).get(0);

        wgs.guessPlayer("0", werwolfPlayer.getName());
        wgs.guessPlayer("1", werwolfPlayer.getName());
        wgs.guessPlayer("2", seerPlayer.getName());

        Set<WerwoerterRole> roles = wgs.getMajorityRoleForPlayers();

        assertThat(roles.contains(WerwoerterRole.WEREWOLF), is(true));
        assertThat(roles.contains(WerwoerterRole.SEER), is(false));
        assertThat(roles.contains(WerwoerterRole.CITIZEN), is(false));
        assertThat(roles.size(), is(1));

        wgs.guessPlayer("4", seerPlayer.getName());
        roles = wgs.getMajorityRoleForPlayers();
        assertThat(roles.contains(WerwoerterRole.WEREWOLF), is(true));
        assertThat(roles.contains(WerwoerterRole.SEER), is(true));
        assertThat(roles.contains(WerwoerterRole.CITIZEN), is(false));
        assertThat(roles.size(), is(2));
    }

    @Test
    public void guessPlayer_noMajority() {
        List<Profile> profiles = createNewProfiles(5);
        Game game = new Game("new", GameType.WERWOERTER, "asdf");
        profiles.stream()
                .map(Profile::getIdentity)
                .map(Identity::getName)
                .forEach(game::join);
        WerwoerterGame wgs = new WerwoerterGame(game);

        wgs.guessPlayer("0","0");
        wgs.guessPlayer("1","1");
        wgs.guessPlayer("2","2");
        wgs.guessPlayer("3","3");
        wgs.guessPlayer("4","4");

        Set<WerwoerterRole> roles = wgs.getMajorityRoleForPlayers();

        assertThat(roles.size(), is(0));
    }

    @Test
    public void constructor_twoWordsCreated_differentWords() {
        List<Profile> profiles = createNewProfiles(5);
        Game game1 = new Game("new", GameType.WERWOERTER, "asdf");
        WerwoerterGame wgs1 = new WerwoerterGame(game1);

        Game game2 = new Game("new", GameType.WERWOERTER, "asdf");
        WerwoerterGame wgs2 = new WerwoerterGame(game2);

        assertThat(wgs1.getWord(), is(not(nullValue())));
        assertThat(wgs1.getWord().length(), is(greaterThan(0)));
        assertThat(wgs2.getWord(), is(not(nullValue())));
        assertThat(wgs2.getWord().length(), is(greaterThan(0)));
        assertThat(wgs1.getWord(), is(not(equalTo(wgs2.getWord()))));
    }



    private List<Profile> createNewProfiles(int count) {
        List<Profile> profiles = new ArrayList<>();
        for (int i = 0; i< count; i++) {
            Identity identity = new Identity(String.valueOf(i));
            Profile profile = new Profile(identity);
            profiles.add(profile);
        }
        return profiles;
    }
}
