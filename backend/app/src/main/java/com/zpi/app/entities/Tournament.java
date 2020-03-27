package com.zpi.app.entity;

import javax.persistence.*;
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

    @ManyToMany
    @JoinTable(name = "tournaments_participants",
            joinColumns = {@JoinColumn(name = "tournament_id")},
            inverseJoinColumns = {@JoinColumn(name = "participant_id")})
    private List<User>participants;

    @OneToMany(mappedBy = "tournament")
    private  List<Match> matches;

    private String name;
    private Boolean isPrivate;
    private Integer numberOfPlayers;
    private String description;
    private Boolean randomBracket;

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

    public Boolean getPrivate() {
        return isPrivate;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
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
}
