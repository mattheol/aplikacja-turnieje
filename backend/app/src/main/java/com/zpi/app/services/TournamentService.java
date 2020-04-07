package com.zpi.app.services;

import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;
import com.zpi.app.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;

    public TournamentService(TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }


    public List<Tournament> getAllTournaments(){
        return tournamentRepository.findAll();
    }

    public Tournament getTournament(Integer id){
        Optional<Tournament> tournamentOpt = tournamentRepository.findById(id);
        return tournamentOpt.get();
    }

    public Tournament addTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }
}
