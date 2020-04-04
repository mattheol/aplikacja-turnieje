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
                .orElseThrow(() -> new UsernameNotFoundException("User with given login not found"));
        return new org.springframework.security.core.userdetails.User(userDB.getLogin(), userDB.getPassword(),
                new ArrayList<>());
    }

    public User registerNewUser(User user) throws UserAlreadyExistsException {
        if (!userRepository.existsByEmail(user.getEmail()) || !userRepository.existsByLogin(user.getLogin())) {
//            User user = new User();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
//            user.setEmail(userDto.getEmail());
            return userRepository.save(user);
        } else {
            throw new UserAlreadyExistsException("User having this email address or login  already exists");
        }

    }


    public void authenticate(String username, String password) throws MyAuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new MyAuthenticationException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new MyAuthenticationException("INVALID_CREDENTIALS", e);
        }
    }


}

