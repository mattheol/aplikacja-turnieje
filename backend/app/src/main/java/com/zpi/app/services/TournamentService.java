package com.zpi.app.services;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;

import com.zpi.app.repositories.ParticipantTournamentRepository;
import com.zpi.app.repositories.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final ParticipantTournamentRepository participantTournamentRepository;

    public TournamentService(TournamentRepository tournamentRepository, ParticipantTournamentRepository participantTournamentRepository) {
        this.tournamentRepository = tournamentRepository;
        this.participantTournamentRepository = participantTournamentRepository;
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

    public void saveUserToTournament(ParticipantTournament participantTournament){
        participantTournamentRepository.save(participantTournament);
    }

}
