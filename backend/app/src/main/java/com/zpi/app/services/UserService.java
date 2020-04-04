package com.zpi.app.services;

import com.zpi.app.entities.User;
import com.zpi.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

//    public User addUser(User user) {
//        return userRepository.save(user);
//    }

//    public boolean checkIfAlreadyLoginExist(String login){
//        if(userRepository.findByLogin(login) !=null ){
//            return true;
//        }else {
//            return false;
//        }
//    }
//
//    public boolean checkIfEmailAlreadyExist(String email) {
//        if(userRepository.findByEmail(email) !=null ){
//            return true;
//        }else {
//            return false;
//        }
//    }

//    public boolean authenticate(String login, String password){
//        if(userRepository.loginPasswordMatches(login,password) !=null){
//            return true;
//        }else{
//            return false;
//        }
//    }
}
