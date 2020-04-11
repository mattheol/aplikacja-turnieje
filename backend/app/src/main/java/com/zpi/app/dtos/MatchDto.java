package com.zpi.app.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zpi.app.entities.Match;
import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

public class MatchDto {

    private Integer id;
    private String teamName;
    private String opponentTeamName;
    private List<User> matchParticipants;
    private Tournament tournament;
    private Integer winnerId;
    private String score;
    private String comment;
    private String stage;
    private Date startTime;

    public MatchDto(Match match, String teamName, String opponentTeamName) {
        this.id = match.getId();
        this.teamName = teamName;
        this.opponentTeamName = opponentTeamName;
        this.matchParticipants = match.getMatchParticipants();
        this.tournament = match.getTournament();
        this.winnerId = match.getWinnerId();
        this.score = match.getScore();
        this.comment = match.getComment();
        this.stage = match.getStage();
        this.startTime = match.getStartTime();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getOpponentTeamName() {
        return opponentTeamName;
    }

    public void setOpponentTeamName(String opponentTeamName) {
        this.opponentTeamName = opponentTeamName;
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

    public Integer getWinnerId() {
        return winnerId;
    }

    public void setWinnerId(Integer winnerId) {
        this.winnerId = winnerId;
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

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @Override
    public String toString() {
        return "MatchDto{" +
                "id=" + id +
                ", teamName='" + teamName + '\'' +
                ", opponentTeamName='" + opponentTeamName + '\'' +
                ", matchParticipants=" + matchParticipants +
                ", tournament=" + tournament +
                ", winnerId=" + winnerId +
                ", score='" + score + '\'' +
                ", comment='" + comment + '\'' +
                ", stage='" + stage + '\'' +
                ", startTime=" + startTime +
                '}';
    }
}
