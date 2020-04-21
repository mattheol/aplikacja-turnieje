package com.zpi.app.services;

import com.zpi.app.dtos.MatchDto;
import com.zpi.app.entities.*;

import com.zpi.app.exceptions.ElementNotExistException;
import com.zpi.app.repositories.MatchRepository;
import com.zpi.app.repositories.ParticipantTournamentRepository;
import com.zpi.app.repositories.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentService {
    private final TournamentRepository tournamentRepository;
    private final ParticipantTournamentRepository participantTournamentRepository;
    private final MatchRepository matchRepository;
    private final UserService userService;

    public TournamentService(TournamentRepository tournamentRepository, UserService userService, ParticipantTournamentRepository participantTournamentRepository, MatchRepository matchRepository, MatchRepository matchRepository1) {
        this.tournamentRepository = tournamentRepository;
        this.participantTournamentRepository = participantTournamentRepository;
        this.userService = userService;
        this.matchRepository = matchRepository1;
    }

    public List<Tournament> getAllTournaments(){
        return tournamentRepository.findAll();
    }


    public Tournament getTournament(Integer id){
        return tournamentRepository.findById(id)
                .orElseThrow(()->new ElementNotExistException("Turniej o takim id nie istnieje"));

    }

    public List<MatchDto> getTournamentAllMatches(Integer id){
        Tournament tournament = getTournament(id);
        List<Match> tournamentMatches = tournament.getMatches();
        if (!tournament.getIsForTeams()) {
            return tournamentMatches.stream()
                    .map(m -> new MatchDto(m, null, null))
                    .collect(Collectors.toList());
        }else {
            List<List<User>> matchesParticipants = tournamentMatches.stream()
                    .map(Match::getMatchParticipants)
                    .collect(Collectors.toList());
            List<MatchDto> matchDtos = new ArrayList<>();
            for (int i = 0; i < matchesParticipants.size(); i++) {
                List<User> matchParticipants = matchesParticipants.get(i);
                String[] teamNames = {null, null};
                for (int j = 0; j < matchParticipants.size(); j++) {
                    User matchParticipant = matchParticipants.get(j);
                    String teamName = tournament.getParticipants().stream()
                            .filter(p -> p.getParticipant().equals(matchParticipant))
                            .map(ParticipantTournament::getTeamName)
//                            .map(Optional::ofNullable)
                            .findFirst()
//                            .flatMap(Function.identity())
                            .orElse(null);
                    teamNames[j] = teamName;
                }
                matchDtos.add(new MatchDto(tournamentMatches.get(i), teamNames[0], teamNames[1]));
            }
            return matchDtos;
        }

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

    public void disenrollUserFromTournament( String login, Integer idTour, String teamName){
        User user= userService.findByLogin(login);
        ParticipantTournamentID participantTournamentID = new ParticipantTournamentID();
        participantTournamentID.setParticipantId(user.getId());
        participantTournamentID.setTournamentId(idTour);
        removeUserFromTournament(participantTournamentRepository.getOne(participantTournamentID));
    }

    public void removeUserFromTournament(ParticipantTournament participantTournament){
        participantTournamentRepository.delete(participantTournament);
    }

    public void updateMatchScore(Match match, Integer idTour){
        match.setTournament(getTournament(idTour));
        matchRepository.save(match);
    }

}
