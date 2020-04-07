package com.zpi.app.repositories;

import com.zpi.app.entities.ParticipantTournament;
import com.zpi.app.entities.ParticipantTournamentID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantTournamentRepository extends JpaRepository<ParticipantTournament, ParticipantTournamentID> {
}
