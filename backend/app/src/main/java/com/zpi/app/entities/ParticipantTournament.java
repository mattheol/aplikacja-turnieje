package com.zpi.app.entities;

import javax.persistence.*;

@Entity
@Table(name ="tournaments_participants")
public class ParticipantTournament {

    @EmbeddedId
    private ParticipantTournamentID participantTournamentID;

    private String teamName;

    @ManyToOne
    @MapsId("participantId")
    private User participant;


    @ManyToOne
    @MapsId("tournamentId")
    private Tournament tournament;


    public ParticipantTournamentID getParticipantTournamentID() {
        return participantTournamentID;
    }

    public void setParticipantTournamentID(ParticipantTournamentID participantTournamentID) {
        this.participantTournamentID = participantTournamentID;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
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
}
