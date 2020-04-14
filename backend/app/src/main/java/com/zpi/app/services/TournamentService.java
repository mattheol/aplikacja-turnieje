package com.zpi.app.services;

import com.zpi.app.entities.*;

import com.zpi.app.repositories.ParticipantTournamentRepository;
import com.zpi.app.repositories.TournamentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final ParticipantTournamentRepository participantTournamentRepository;
    private final UserService userService;

    public TournamentService(TournamentRepository tournamentRepository,  UserService userService, ParticipantTournamentRepository participantTournamentRepository) {
        this.tournamentRepository = tournamentRepository;
        this.participantTournamentRepository = participantTournamentRepository;
        this.userService = userService;
    }

    public List<Tournament> getAllTournaments(){
        List<Tournament> tournaments= tournamentRepository.findAll();
        return tournaments;
    }


    public Tournament getTournament(Integer id){
        Optional<Tournament> tournamentOpt = tournamentRepository.findById(id);
        return tournamentOpt.get();
    }

    public Tournament addTournament(String login, Tournament tournament) {
        tournament.getOrganizers().add(userService.findByLogin(login));
        return tournamentRepository.save(tournament);
    }

    public void enrollUserToTournament( String login, Integer idTour, String teamName){
        User user= userService.findByLogin(login);
        ParticipantTournamentID participantTournamentID = new ParticipantTournamentID();
        participantTournamentID.setParticipantId(user.getId());
        participantTournamentID.setTournamentId(idTour);
        ParticipantTournament participantTournament = new ParticipantTournament();
        participantTournament.setParticipantTournamentID(participantTournamentID);
        participantTournament.setParticipant(user);
        participantTournament.setTournament(getTournament(idTour));
        participantTournament.setTeamName(teamName);
        saveUserToTournament(participantTournament);
    }

    public void saveUserToTournament(ParticipantTournament participantTournament){
        participantTournamentRepository.save(participantTournament);
    }

}
