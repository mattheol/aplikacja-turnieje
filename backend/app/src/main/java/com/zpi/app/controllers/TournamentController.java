package com.zpi.app.controllers;

import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.*;
import com.zpi.app.services.TournamentService;
import com.zpi.app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TournamentController {
    private final TournamentService tournamentService;
    private final UserService userService;

    public TournamentController(TournamentService tournamentService, UserService userService) {
        this.tournamentService = tournamentService;
        this.userService = userService;
    }


    @GetMapping("/tournaments")
    public List<UserTournament> getAllTournaments(){
        List<Tournament> tournaments = tournamentService.getAllTournaments();
        List<UserTournament> list = new ArrayList<>();
        for(Tournament tour : tournaments){
            list.add(new UserTournament(tour));
        }
        return list;

    }

    @GetMapping("/tournaments/{id}")
    public Tournament getTournament(@PathVariable Integer id){
        return tournamentService.getTournament(id);
    }


    @GetMapping("tournaments/{id}/matches")
    public ResponseEntity<?> getMatchesByTournamentId(@PathVariable Integer id){
        Tournament tournament = tournamentService.getTournament(id);
        return new ResponseEntity<>(tournament.getMatches(),HttpStatus.OK);
    }

    @PostMapping("/tournaments")
    public ResponseEntity<?> addTournament(@RequestBody Tournament tournament) {
        Tournament tournament1 = tournamentService.addTournament(tournament);
        return new ResponseEntity<>(tournament1, HttpStatus.OK);
    }


    @PostMapping("/enroll")
    public ResponseEntity<?> enrollUserToTournament(@RequestParam("login") String login, @RequestParam("idTour") Integer idTour,
                                                    @RequestParam("teamName") String teamName){
        User user= this.userService.findByLogin(login);

        ParticipantTournamentID participantTournamentID = new ParticipantTournamentID();
        participantTournamentID.setParticipantId(user.getId());
        participantTournamentID.setTournamentId(idTour);
        ParticipantTournament participantTournament = new ParticipantTournament();
        participantTournament.setParticipantTournamentID(participantTournamentID);
        participantTournament.setParticipant(user);
        participantTournament.setTournament(tournamentService.getTournament(idTour));
        participantTournament.setTeamName(teamName);
        this.tournamentService.saveUserToTournament(participantTournament);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
