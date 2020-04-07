package com.zpi.app.controllers;


import com.zpi.app.dtos.JwtRequest;
import com.zpi.app.dtos.JwtResponse;

import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;

import com.zpi.app.entities.User;
import com.zpi.app.exceptions.MyAuthenticationException;
import com.zpi.app.exceptions.UserAlreadyExistsException;
import com.zpi.app.security.JwtTokenUtil;
import com.zpi.app.services.JwtUserDetailsService;
import com.zpi.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    private UserService userService;
    private JwtUserDetailsService userDetailsService;
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public UserController(UserService userService, JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody
                                      @Valid User user) throws UserAlreadyExistsException {

        userDetailsService.registerNewUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody
                                           JwtRequest authenticationRequest) throws MyAuthenticationException {

        userDetailsService.authenticate(authenticationRequest.getLogin(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getLogin());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return new ResponseEntity<>(new JwtResponse(token,authenticationRequest.getLogin()), HttpStatus.OK);

    }

    @GetMapping("/users/{id}/tournaments")
    public List<UserTournament> getAllUserTournaments(@PathVariable Integer id){
        return userService.getAllUserTournaments(id);
    }

}
