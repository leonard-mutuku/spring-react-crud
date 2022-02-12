/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.crud.controller;

import com.crud.model.User;
import com.crud.repository.UserRepository;
import com.github.javafaker.Faker;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 *
 * @author leonard
 */
@Component
public class InitialInsert implements CommandLineRunner {

    private final Faker faker = new Faker(Locale.getDefault());

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        for (int i = 1; i <= 15; i++) {
            Long id = Long.valueOf(i);
            userRepository.save(new User(id, faker.name().firstName(), faker.name().lastName(), faker.phoneNumber().cellPhone(), faker.internet().emailAddress()));
        }
    }

}
