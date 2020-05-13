package com.zpi.app.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "tournaments")
public class Tournament {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany
    @JoinTable(name="tournaments_organizers",
            joinColumns = {@JoinColumn(name = "tournament_id")},
            inverseJoinColumns = {@JoinColumn(name = "organizer_id")})
    private List<User> organizers;

    @OneToMany(mappedBy = "tournament",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnoreProperties("tournament")
    private List<ParticipantTournament> participants;

    @JsonIgnore
    @OneToMany(mappedBy = "tournament")
    private  List<Match> matches;

    private String name;
    private Boolean isPrivate;
    private Integer numberOfPlayers;
    private String description;
    private Boolean randomBracket;

    private Boolean isForTeams;

    private Boolean isActive;
    private Date enrollmentEnd;

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Date getEnrollmentEnd() {
        return enrollmentEnd;
    }

    public void setEnrollmentEnd(Date enrollmentEnd) {
        this.enrollmentEnd = enrollmentEnd;
    }


    @Enumerated(EnumType.STRING)
    private TournamentType tournamentType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TournamentType getTournamentType() {
        return tournamentType;
    }

    public void setTournamentType(TournamentType tournamentType) {
        this.tournamentType = tournamentType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public Integer getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(Integer numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getRandomBracket() {
        return randomBracket;
    }

    public void setRandomBracket(Boolean randomBracket) {
        this.randomBracket = randomBracket;
    }

    public List<User> getOrganizers() {
        return organizers;
    }

    public void setOrganizers(List<User> organizers) {
        this.organizers = organizers;
    }

    public List<ParticipantTournament> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ParticipantTournament> participants) {
        this.participants = participants;
    }

    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public Boolean getIsForTeams() {
        return isForTeams;
    }

    public void setIsForTeams(Boolean isForTeams) {
        this.isForTeams = isForTeams;
    }

}
