package com.zpi.app.services;

import com.zpi.app.entities.User;
import com.zpi.app.exceptions.MyAuthenticationException;
import com.zpi.app.exceptions.UserAlreadyExistsException;
import com.zpi.app.repositories.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {


    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    public JwtUserDetailsService(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, @Lazy AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User userDB = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono użytkownika o takim loginie"));
        return new org.springframework.security.core.userdetails.User(userDB.getLogin(), userDB.getPassword(),
                new ArrayList<>());
    }

    public User registerNewUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new UserAlreadyExistsException("Użytkownik o takim mailu już istnieje");
        if (userRepository.existsByLogin(user.getLogin()))
            throw new UserAlreadyExistsException("Użytkownik o takim loginie już istnieje");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void changePassword(String login, String oldPassword, String newPassword) throws MyAuthenticationException{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, oldPassword));
            User user = userRepository.findByLogin(login).get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } catch (BadCredentialsException e) {
            throw new MyAuthenticationException("Niepoprawne obecne hasło");
        }catch (Exception ex){
            throw new MyAuthenticationException("Coś poszło nie tak");
        }


    }


    public void authenticate(String login, String password) throws MyAuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        } catch (DisabledException e) {
            throw new MyAuthenticationException("Użytkownik nieczynny");
        } catch (BadCredentialsException e) {
            throw new MyAuthenticationException("Niepoprawne dane logowania");
        }
    }


}

