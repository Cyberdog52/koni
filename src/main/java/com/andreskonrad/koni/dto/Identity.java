package com.andreskonrad.koni.dto;


import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class Identity {

    private String name;

    //for jpa and json deserialization
    public Identity() {}

    public Identity(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Identity identity = (Identity) o;
        return Objects.equals(name, identity.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
