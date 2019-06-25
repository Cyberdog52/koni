package com.andreskonrad.koni.dto;

import javax.persistence.*;

@Entity
@Table
public class Profile {

    @Embedded
    private Identity identity;

    public void setPassword_plain(String password_plain) {
        this.password_plain = password_plain;
    }

    public void setPassword_encrypted(byte[] password_encrypted) {
        this.password_encrypted = password_encrypted;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }

    private String password_plain;
    private byte[] password_encrypted;
    private byte[] salt;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id = -1;

    //for jpa and json deserialization
    public Profile() {}

    public Profile(Identity identity) {
        this.identity = identity;
    }

    public Identity getIdentity() {
        return identity;
    }

    public String getPassword_plain() {
        return password_plain;
    }

    public byte[] getPassword_encrypted() {
        return password_encrypted;
    }

    public byte[] getSalt() {
        return salt;
    }
}
