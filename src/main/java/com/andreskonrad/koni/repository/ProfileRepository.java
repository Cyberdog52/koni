package com.andreskonrad.koni.repository;

import com.andreskonrad.koni.dto.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends CrudRepository<Profile, Long> {

    public Iterable<Profile> findByIdentityName(String name);
}
