package com.andreskonrad.koni.dto.werwoelfle;

import java.util.Objects;
import java.util.Set;

public class WerwoelfleHistoryBlock {
    private final WerwoelflePhase phase;
    private final Set<Vote> votes;

    public WerwoelfleHistoryBlock(WerwoelflePhase phase, Set<Vote> votes) {
        this.phase = phase;
        this.votes = votes;
    }

    public WerwoelflePhase getPhase() {
        return phase;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WerwoelfleHistoryBlock that = (WerwoelfleHistoryBlock) o;
        return phase == that.phase &&
                Objects.equals(votes, that.votes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phase, votes);
    }
}
