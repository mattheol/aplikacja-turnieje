package com.zpi.app.services;

import com.zpi.app.dtos.MatchDto;
import com.zpi.app.dtos.UserTournament;
import com.zpi.app.entities.Match;
import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.Tournament;
import com.zpi.app.entities.User;
import com.zpi.app.exceptions.ElementNotExistException;
import com.zpi.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {

    public static <T> Predicate<T> distinctByKey(
            Function<? super T, ?> keyExtractor) {

        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

//    public static List<UserTournament> concatUserTournament(List<UserTournament> participants, List<UserTournament> organizers) {
//        for (int i = 0; i < organizers.size(); i++) {
//            if (participants.contains(p -> p.getId() == organizers.get(i).getId())) {
//
//            }
//        }
//    }

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserTournament> getUserAllTournaments(String login) {
        User user = findByLogin(login);
        List<ParticipantTournament> pt = user.getParticipatedTournaments();
        List<Tournament> ot = user.getTournaments();
        List<UserTournament> organized = ot.stream().map(UserTournament::new).collect(Collectors.toList());
        List<UserTournament> participated = pt.stream().map(UserTournament::new).collect(Collectors.toList());
        List<UserTournament> concat = Stream.concat(participated.stream(),organized.stream()).distinct().collect(Collectors.toList());
        for (UserTournament c : concat) {
            if(organized.contains(c)) {
                c.setOrganizer(true);
            }
        }
        return concat;
//        return concat.stream().filter(distinctByKey(UserTournament::getId)).collect(Collectors.toList());
//        return pt.stream().map(UserTournament::new).collect(Collectors.toList());
    }

    public List<MatchDto> getUserAllMatches(String login) {
        User user = findByLogin(login);
        List<Match> userMatches = user.getMatches();
        List<User> opponents = userMatches.stream()
                .map(Match::getMatchParticipants)
                .map(users -> users.stream()
                                .filter(user1 -> !user1.equals(user))
                                .findFirst().orElse(null))
                .collect(Collectors.toList());
        List<MatchDto> matchDtos = new ArrayList<>();
        for (int i = 0; i < userMatches.size(); i++) {
            String userTeamName = getTeamName(user, userMatches.get(i));
            String opponentTeamName = getTeamName(opponents.get(i), userMatches.get(i));
            matchDtos.add(new MatchDto(userMatches.get(i), userTeamName, opponentTeamName));
        }
        return matchDtos;
    }

    private String getTeamName(User user, Match match) {
        if (user != null) {
            Integer tournamentId = match.getTournament().getId();
            List<ParticipantTournament> participatedTournamentsAssociations = user.getParticipatedTournaments();
            ParticipantTournament participantTournamentAssociation = participatedTournamentsAssociations.stream()
                    .filter(p -> p.getTournament().getId().equals(tournamentId)).findFirst().get();
            return participantTournamentAssociation.getTeamName();
        }else return null;
    }

    public User findByLogin(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(()->new ElementNotExistException("Użytkownik o takim loginie nie istnieje"));
    }

    public User update(User user, String login) {
        User usr = findByLogin(login);
        usr.setFirstName(user.getFirstName());
        usr.setLastName(user.getLastName());
        usr.setEmail(user.getEmail());
        usr.setGender(user.getGender());
        usr.setBirthday(user.getBirthday());
        userRepository.save(usr);
        return user;
    }
}
