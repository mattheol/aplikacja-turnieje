package com.zpi.app.dtos;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;


public class UserTournament {
    private String name;
    private Boolean isForTeams;
    private String teamName;

    public UserTournament(ParticipantTournament pt){
        Tournament tour = pt.getTournament();
        this.name = tour.getName();
        this.isForTeams = tour.getForTeams();
        this.teamName = pt.getTeamName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getForTeams() {
        return isForTeams;
    }

    public void setForTeams(Boolean forTeams) {
        isForTeams = forTeams;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
