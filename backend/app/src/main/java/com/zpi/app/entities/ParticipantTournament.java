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
}
