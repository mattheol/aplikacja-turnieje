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

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<UserTournament> getAllUserTournaments(Integer id){
        User user = getById(id);
        List<ParticipantTournament> pt = user.getParticipatedTournaments() ;
        List<UserTournament> list = new ArrayList<>();
        for(ParticipantTournament p: pt){
            list.add(new UserTournament(p));
        }
        return list;
    }

    public User getById(Integer userId){
        return userRepository.findById(userId).get();
    }

}
