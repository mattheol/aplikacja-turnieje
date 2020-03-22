package com.zpi.app.entity;

import javax.persistence.*;

@Entity
public class Organise {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer organiseId;
    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User userId;
    @ManyToOne
    @JoinColumn(name = "tournamentId",nullable = false)
    private Tournament tournamentId;

    public Integer getOrganiseId() {
        return organiseId;
    }

    public void setOrganiseId(Integer organiseId) {
        this.organiseId = organiseId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Tournament getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Tournament tournamentId) {
        this.tournamentId = tournamentId;
    }
}
