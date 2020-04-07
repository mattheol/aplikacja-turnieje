package com.zpi.app.repositories;

import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByLogin(String login);


}
