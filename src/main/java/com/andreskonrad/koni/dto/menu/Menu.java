package com.andreskonrad.koni.dto.menu;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table
public class Menu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String name;

    @ElementCollection
    private List<MenuPart> menuParts = new ArrayList<>();

    //for jpa and json deserialization
    public Menu() {
    }

    public List<MenuPart> getMenuParts() {
        return menuParts;
    }

    public void setMenuParts(List<MenuPart> menuParts) {
        this.menuParts = menuParts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return id == menu.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Long getId() {
        return id;
    }
}
