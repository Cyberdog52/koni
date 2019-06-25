package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.Identity;
import com.andreskonrad.koni.dto.Profile;
import com.andreskonrad.koni.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfilesController {

    @Autowired
    private ProfileService profileService;

    @RequestMapping("/{name}")
    public Object get(@PathVariable("name") String username) {
        Identity identity = new Identity(username);
        Profile profile = profileService.getProfile(identity);
        if (profile == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_FOUND);
        }
        return profile;
    }

    @PostMapping("")
    public Object create(@RequestBody Profile profileBody) {
        Profile profile = profileService.update(profileBody);
        if (profile == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return profile;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Profile profile){
        boolean success = profileService.login(profile);
        if (success) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
