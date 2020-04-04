package com.zpi.app.repositories;

import com.zpi.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

//    @Query(value = "select * from users where login=?1",nativeQuery = true)
    public Optional<User> findByLogin(String login);

//    @Query(value = "select * from users where email=?1",nativeQuery = true)
//    public User findByEmail(String email);

//    @Query(value = "select * from users where login=?1 and password=?2",nativeQuery = true)
//    public User loginPasswordMatches(String login,String password);

    Optional<User> findByEmail(String email);

//    Optional<User> findByLogin(String email);

    Boolean existsByEmail(String email);

    Boolean existsByLogin(String login);
}
