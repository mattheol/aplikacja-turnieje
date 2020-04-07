package com.zpi.app.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;


import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @OneToMany(mappedBy = "participant",
               cascade = CascadeType.ALL,
                orphanRemoval = true)
    @JsonIgnoreProperties("participant")
    private List<ParticipantTournament> participatedTournaments;


    @JsonIgnore
    @ManyToMany(mappedBy = "organizers")
    private List<Tournament> tournaments;

    @JsonIgnore
    @ManyToMany(mappedBy = "matchParticipants")
    private List<Match> matches;

    @Length(min = 5)
    @Column(unique = true)
    private String login;

    @Length(min = 6)
    private String password;

    @Length(min =2)
    private String firstName;

    @Length(min = 2)
    private String lastName;

    @Email
    @Column(unique = true)
    private String email;
    private Date birthday;
    private Character gender;

    public Integer getId() {
        return id;
    }


    public List<ParticipantTournament> getParticipatedTournaments() {
        return participatedTournaments;
    }

    public void setParticipatedTournaments(List<ParticipantTournament> participatedTournaments) {
        this.participatedTournaments = participatedTournaments;
    }

    public List<Tournament> getTournaments() {
        return tournaments;
    }

    public void setTournaments(List<Tournament> tournaments) {
        this.tournaments = tournaments;
    }

    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }
}
