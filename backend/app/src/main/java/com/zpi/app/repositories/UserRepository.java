package com.zpi.app.repositories;

import com.zpi.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "select * from users where login=?1",nativeQuery = true)
    public User findByLogin(String login);

    @Query(value = "select * from users where email=?1",nativeQuery = true)
    public User findByEmail(String email);
}
