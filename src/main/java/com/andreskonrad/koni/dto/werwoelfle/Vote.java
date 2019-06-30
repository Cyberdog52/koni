package com.andreskonrad.koni.dto.werwoelfle;

import java.util.Objects;

public class Vote {
    private final String fromName;
    private final String toName;

    public Vote(String fromName, String toName) {
        this.fromName = fromName;
        this.toName = toName;
    }

    public String getFromName() {
        return fromName;
    }

    public String getToName() {
        return toName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vote vote = (Vote) o;
        return Objects.equals(fromName, vote.fromName) &&
                Objects.equals(toName, vote.toName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fromName, toName);
    }
}
