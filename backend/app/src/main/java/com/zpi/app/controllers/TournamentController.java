package com.zpi.app.controllers;

import com.zpi.app.entities.Tournament;
import com.zpi.app.services.TournamentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

}
