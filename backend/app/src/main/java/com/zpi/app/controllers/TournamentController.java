package com.zpi.app.controllers;

import com.zpi.app.dtos.MatchDto;
import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.*;
import com.zpi.app.exceptions.UserAlreadyExistsException;
import com.zpi.app.security.JwtTokenUtil;
import com.zpi.app.services.TournamentService;
import com.zpi.app.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class TournamentController {
    private final TournamentService tournamentService;
    private final JwtTokenUtil jwtTokenUtil;

    public TournamentController(TournamentService tournamentService, JwtTokenUtil jwtTokenUtil) {
        this.tournamentService = tournamentService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/tournaments")
    public List<UserTournament> getAllTournaments(){
        List<Tournament> tournaments = tournamentService.getAllTournaments();
        return tournaments.stream()
                .map(UserTournament::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/tournaments/{id}")
    public Tournament getTournament(@PathVariable Integer id){
        return tournamentService.getTournament(id);
    }


    @GetMapping("tournaments/{id}/matches")
    public List<MatchDto> getMatchesByTournamentId(@PathVariable Integer id){
//        Tournament tournament = tournamentService.getTournament(id);
//        return new ResponseEntity<>(tournament.getMatches(),HttpStatus.OK);
        return tournamentService.getTournamentAllMatches(id);
    }

    @GetMapping("tournaments/{id}/organizers")
    public List<User> getOrganizersByTournamentId(@PathVariable Integer id){
        return tournamentService.getTournamentAllOrganizers(id);
    }

    @PostMapping("/tournaments")
    public ResponseEntity<?> addTournament(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Tournament tournament) {
        Tournament tournament1 = tournamentService.addTournament(jwtTokenUtil.getLoginFromHeader(authorizationHeader), tournament);
        return new ResponseEntity<>(tournament1, HttpStatus.OK);
    }

    @PutMapping("/organizer")
    public ResponseEntity<?> enrollOrganiserToTournament(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Tournament tournament, @RequestParam("userLogin") String userLogin ) throws UserAlreadyExistsException {
        Tournament res = tournamentService.enrollOrganizerToTournament(userLogin, tournament);
        if(res==null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollUserToTournament(@RequestHeader("Authorization") String authorizationHeader, @RequestParam("idTour") Integer idTour,
                                                    @RequestParam("teamName") String teamName){
        tournamentService.enrollUserToTournament(jwtTokenUtil.getLoginFromHeader(authorizationHeader), idTour, teamName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/disenroll")
    public ResponseEntity<?> disenrollUserToTournament(@RequestHeader("Authorization") String authorizationHeader, @RequestParam("idTour") Integer idTour,
                                                    @RequestParam("teamName") String teamName){
        tournamentService.disenrollUserFromTournament(jwtTokenUtil.getLoginFromHeader(authorizationHeader), idTour, teamName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/matches")
    public ResponseEntity<?> updateMatchScore(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Match match,  @RequestParam("idTour") Integer idTour) {
        tournamentService.updateMatchScore(match, idTour);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/matches/newRound")
    public ResponseEntity<?> saveNewRoundMatches(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Match[] matches,  @RequestParam("idTour") Integer idTour) {
        for(Match match : matches){
            tournamentService.saveMatch(match,idTour);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/matches/firstRound")
    public ResponseEntity<?> saveFirstRoundMatches(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Match[] matches,  @RequestParam("idTour") Integer idTour) {
        Tournament t = tournamentService.getTournament(idTour);
        t.setActive(true);
        tournamentService.updateTournament(t);
        for(Match match : matches){
            tournamentService.saveMatch(match,idTour);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
