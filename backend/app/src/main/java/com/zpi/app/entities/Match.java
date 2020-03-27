package com.zpi.app.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany
    @JoinTable(name = "matches_participants",
            joinColumns = {@JoinColumn(name = "match_id")},
            inverseJoinColumns = {@JoinColumn(name = "participant_id")})
    private List<User> matchParticipants;

    @ManyToOne
    private Tournament tournament;

    private String score;

    private String comment;

    private String stage;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<User> getMatchParticipants() {
        return matchParticipants;
    }

    public void setMatchParticipants(List<User> matchParticipants) {
        this.matchParticipants = matchParticipants;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }
}
