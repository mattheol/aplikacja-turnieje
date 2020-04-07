package com.zpi.app.controllers;

import com.zpi.app.entities.Tournament;
import com.zpi.app.services.TournamentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TournamentController {
    private final TournamentService tournamentService;

    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
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
    public ResponseEntity<?> addUser(@RequestBody Tournament tournament) {
        Tournament tournament1 = tournamentService.addTournament(tournament);
        return new ResponseEntity<>(tournament1, HttpStatus.OK);
    }

}
