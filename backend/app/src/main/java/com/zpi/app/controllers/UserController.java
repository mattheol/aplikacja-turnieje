package com.zpi.app.controllers;

import com.zpi.app.entities.User;
import com.zpi.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if(userService.checkIfAlreadyLoginExist(user.getLogin())){
            return new ResponseEntity<>("Login already used", HttpStatus.BAD_REQUEST);
        }
        if(userService.checkIfEmailAlreadyExist(user.getEmail())){
            return new ResponseEntity<>("Email already used",HttpStatus.BAD_REQUEST);
        }
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(String login, String password){
        if(userService.authenticate(login, password)){
            return new ResponseEntity<>("Zalogowano poprawnie", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Zły login lub/i hasło", HttpStatus.BAD_REQUEST);
        }
    }

}
