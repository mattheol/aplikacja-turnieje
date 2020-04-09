package com.zpi.app.controllers;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.ParticipantTournamentID;
import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;
import com.zpi.app.services.TournamentService;
import com.zpi.app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public List<Tournament> getAllTournaments(){
        return tournamentService.getAllTournaments();

    }

    @GetMapping("/tournaments/{id}")
    public Tournament getTournament(@PathVariable Integer id){
        return tournamentService.getTournament(id);
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
