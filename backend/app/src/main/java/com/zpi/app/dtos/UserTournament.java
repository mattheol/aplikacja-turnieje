package com.zpi.app.dtos;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;


public class UserTournament {
    private Integer id;
    private String name;
    private Boolean isForTeams;
    private String teamName;
    private String description;



    public UserTournament(ParticipantTournament pt){
        Tournament tour = pt.getTournament();
        this.id = tour.getId();
        this.name = tour.getName();
        this.isForTeams = tour.getIsForTeams();
        this.teamName = pt.getTeamName();
        this.description = tour.getDescription();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
