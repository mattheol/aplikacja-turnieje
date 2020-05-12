package com.zpi.app.services;

import com.zpi.app.entities.Invitation;
import com.zpi.app.entities.InvitationConfirmType;
import com.zpi.app.entities.User;
import com.zpi.app.repositories.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvitationService {

    private InvitationRepository invitationRepository;
    private UserService userService;
    private TournamentService tournamentService;

    @Autowired
    public InvitationService(InvitationRepository invitationRepository, UserService userService, TournamentService tournamentService) {
        this.invitationRepository = invitationRepository;
        this.userService = userService;
        this.tournamentService = tournamentService;
    }

    public List<Invitation> getUnconfirmedInvitations(String login) {
        User user = userService.findByLogin(login);
        return invitationRepository.findUnconfirmedInvitations(user);
    }
//TODO zaproszenie do turnieju grupowego
    public void confirmInvitation(Invitation invitation, String login,String teamName){
        invitationRepository.save(invitation);
        if(invitation.getConfirmType().equals(InvitationConfirmType.ACCEPTED)) {
            tournamentService.enrollUserToTournament(login, invitation.getTournament().getId(), teamName);
        }
    }

    public void invite(Invitation invitation, String invitedUserLogin, String organizerLogin){
        User invitedUser = userService.findByLogin(invitedUserLogin);
        User organizer = userService.findByLogin(organizerLogin);
        long invNr = invitationRepository.findAll()
                .stream()
                .filter(i->i.getParticipant().equals(invitedUser))
                .filter(i-> i.getTournament().getId() == invitation.getTournament().getId())
                .filter(i->i.getConfirmType()!=InvitationConfirmType.REJECTED)
                .count();

        if(invNr==0){
        invitation.setOrganizer(organizer);
        invitation.setParticipant(invitedUser);
        invitationRepository.save(invitation);
        }
        else {
            throw new RuntimeException("Użytkownik nie odpowiedzial na poprzednie zaproszenie lub już je zaakceptował");
        }
    }
}
