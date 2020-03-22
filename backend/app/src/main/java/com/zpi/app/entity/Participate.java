package com.zpi.app.entity;

import javax.persistence.*;

@Entity
public class Participate {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer participateId;
    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User userId;
    @ManyToOne
    @JoinColumn(name = "tournamentId",nullable = false)
    private Tournament tournamentId;

    public Integer getParticipateId() {
        return participateId;
    }

    public void setParticipateId(Integer participateId) {
        this.participateId = participateId;
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
