package com.zpi.app.controllers;

import com.zpi.app.entities.Invitation;
import com.zpi.app.security.JwtTokenUtil;
import com.zpi.app.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class InvitationController {

    private JwtTokenUtil jwtTokenUtil;

    private InvitationService invitationService;

    @Autowired
    public InvitationController(JwtTokenUtil jwtTokenUtil, InvitationService invitationService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.invitationService = invitationService;
    }

    @GetMapping("/my-invitations")
    public List<Invitation> getInvitations(@RequestHeader("Authorization") String authorizationHeader){
        String login = jwtTokenUtil.getLoginFromHeader(authorizationHeader);
        return invitationService.getUnconfirmedInvitations(login);
    }

    @PutMapping("/my-invitations/{teamName}")
    public List<Invitation> confirmInvitation(@RequestHeader("Authorization") String authorizationHeader,
                                             @PathVariable String teamName,
                                             @RequestBody Invitation invitation){
        String login = jwtTokenUtil.getLoginFromHeader(authorizationHeader);
        if(teamName.equals("null")){
            teamName = null;
        }
        invitationService.confirmInvitation(invitation,jwtTokenUtil.getLoginFromHeader(authorizationHeader),teamName);
        return invitationService.getUnconfirmedInvitations(login);
    }

    @PostMapping("/users/{login}/invitation")
    public void invite(@RequestHeader("Authorization") String authorizationHeader,
                       @RequestBody Invitation invitation,
                       @PathVariable("login") String invitedUserLogin){
        String login = jwtTokenUtil.getLoginFromHeader(authorizationHeader);
        invitationService.invite(invitation,invitedUserLogin,login);
    }
}
