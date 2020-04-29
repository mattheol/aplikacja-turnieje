package com.zpi.app.repositories;

import com.zpi.app.entities.Invitation;
import com.zpi.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation,Integer> {

    @Query("SELECT i FROM Invitation i WHERE i.confirmType=com.zpi.app.entities.InvitationConfirmType.NONE AND i.participant=?1")
    List<Invitation> findUnconfirmedInvitations(User participant);
}
