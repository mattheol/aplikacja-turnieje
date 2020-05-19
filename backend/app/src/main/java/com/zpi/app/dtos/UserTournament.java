package com.zpi.app.dtos;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;

import java.util.Objects;


public class UserTournament {
    private Integer id;
    private String name;
    private Boolean isForTeams;
    private String teamName;
    private String description;
    private Boolean isActive;
    private Boolean isOrganizer = false;

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public UserTournament(ParticipantTournament pt){
        Tournament tour = pt.getTournament();
        this.id = tour.getId();
        this.name = tour.getName();
        this.isForTeams = tour.getIsForTeams();
        this.teamName = pt.getTeamName();
        this.description = tour.getDescription();
        this.isActive = tour.getActive();
    }

    public UserTournament(Tournament tournament){
        this.id = tournament.getId();
        this.name = tournament.getName();
        this.isForTeams = tournament.getIsForTeams();
        this.description = tournament.getDescription();
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

    public Boolean getOrganizer() {
        return isOrganizer;
    }

    public void setOrganizer(Boolean organizer) {
        isOrganizer = organizer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserTournament that = (UserTournament) o;
        return id.equals(that.id) &&
                name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
