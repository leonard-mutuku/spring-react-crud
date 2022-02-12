/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.crud.repository;

import com.crud.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author leonard
 */
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT u FROM User u WHERE lower(u.firstName) LIKE lower(concat('%', ?1, '%')) OR lower(u.lastName) LIKE lower('%'||?1||'%')"
            + " OR u.emailAddress LIKE %?1% ORDER BY u.id DESC")
    List<User> findByFilter(String filter);
}
