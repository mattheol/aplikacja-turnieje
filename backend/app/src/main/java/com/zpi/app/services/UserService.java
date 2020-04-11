package com.zpi.app.services;

import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;
import com.zpi.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<UserTournament> getAllUserTournaments(String login){
        User user = findByLogin(login);
        List<ParticipantTournament> pt = user.getParticipatedTournaments() ;
        return pt.stream()
                .map(UserTournament::new)
                .collect(Collectors.toList());
    }

    public User findByLogin(String login){
        return userRepository.findByLogin(login).get();
    }

}
