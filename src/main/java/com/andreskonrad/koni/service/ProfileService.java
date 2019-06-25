package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Identity;
import com.andreskonrad.koni.dto.Profile;
import com.andreskonrad.koni.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile update(Profile profile) {
        Profile existingProfile = get(profile);
        if (existingProfile != null) {
            return null;
        }

        secureProfile(profile, null);
        return profileRepository.save(profile);
    }

    private Profile get(Profile profile) {
        return getProfile(profile.getIdentity());

    }

    public Profile getProfile(Identity identity) {
        try {
            Iterable<Profile> results = profileRepository.findByIdentityName(identity.getName());
            if (results.iterator().hasNext()) {
                return results.iterator().next();
            } else {
                return null;
            }
        } catch (NullPointerException e) {
            return null;
        }
    }

    public boolean login(Profile profile) {
        Profile savedProfile = get(profile);
        if (savedProfile == null) {
            return false;
        }

        secureProfile(profile, savedProfile.getSalt());

        return Arrays.equals(profile.getPassword_encrypted(), savedProfile.getPassword_encrypted());
    }

    private void secureProfile(Profile profile, byte[] salt) {
        if (profile.getPassword_plain() == null) {
            return;
        }

        if (salt != null) {
            profile.setSalt(salt);
        } else {
            profile.setSalt(generateSalt());
        }

        profile.setPassword_encrypted(encode(profile.getPassword_plain(), profile.getSalt()));
        profile.setPassword_plain(null);
    }

    private byte[] encode(String password_plain, byte[] salt) {
        KeySpec spec = new PBEKeySpec(password_plain.toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory;
        try {
            factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
        try {
            return factory.generateSecret(spec).getEncoded();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
            return null;
        }
    }

    private byte[] generateSalt(){
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }
}
