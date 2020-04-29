package com.zpi.app.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="invitations")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private User organizer;

    @OneToOne
    private User participant;

    @OneToOne
    private Tournament tournament;

    private Date invitationTime;

    private String invitationMessage;

    @Enumerated(EnumType.STRING)
    private InvitationConfirmType confirmType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public User getParticipant() {
        return participant;
    }

    public void setParticipant(User participant) {
        this.participant = participant;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Date getInvitationTime() {
        return invitationTime;
    }

    public void setInvitationTime(Date invitationTime) {
        this.invitationTime = invitationTime;
    }

    public String getInvitationMessage() {
        return invitationMessage;
    }

    public void setInvitationMessage(String invitationMessage) {
        this.invitationMessage = invitationMessage;
    }

    public InvitationConfirmType getConfirmType() {
        return confirmType;
    }

    public void setConfirmType(InvitationConfirmType confirmType) {
        this.confirmType = confirmType;
    }
}
